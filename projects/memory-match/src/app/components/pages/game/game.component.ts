import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';
import { CardID } from '../../widgets/card/card-id';
import { CardWithState } from '../../../types/classes/card-with-state';
import { MemoryMatchService } from '../../../services/memory-match.service';
import { MemoryCard } from '../../../types/types/memory-card';
import { MemoryRound } from '../../../types/types/memory-round';
import { CardState } from '../../widgets/card/card-state';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  cardbackImageURL: string;
  cardsWithState: CardWithState[];

  selectedCards: CardID[] = [];
  errorMessage: string;

  matchesMade: number = 0;

  delayTime: number = 700; // ms required to respond to changes in state

  winMessage: string;

  constructor( private memoryMatchService: MemoryMatchService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap)=>{
        return this.memoryMatchService.getRoundByID(params.get('id'));
      })
    )
    .subscribe((round: MemoryRound)=>{
      this.cardbackImageURL = round.cardbackImageURL;
      this.cardsWithState = round.cards.map((c:MemoryCard)=>{
        return new CardWithState(c, CardState.FaceDown);
      });
      console.log(this.cardsWithState);
    });
  }

  handleCardClick(ids: CardID ){
    if(this.selectedCards.length === 2) return; // disallow a third click
    let elementID: string = ids['elementID'];
    let cardID: string = ids['cardID'];
    if(this.cardsWithState[elementID].state === CardState.FaceUp){
      console.log(`Deactivating card ${elementID}`);
      return; // ignore repeated clicks
    } 
    this.updateCardState(elementID,CardState.Inactive);
    this.addCardSelection(ids);
  }

  private addCardSelection(clickedCardIDs: CardID){
    let l = this.selectedCards.length;

    if(l>1) return false;
    this.cardsWithState[clickedCardIDs.elementID].state = CardState.FaceUp;
    this.selectedCards.push(clickedCardIDs);
    l++;
    if(l === 1) return true; // first card added as match candidate

    // l == 2
    try{
      this.checkForMatch()
    } catch(error){
      this.errorMessage = error;
    }
  }

  private checkForMatch(){
    if(!(this.selectedCards.length === 2)) throw new Error("Invalid number of cards to compare. checkForMatch requires an array of length 2.");
    let cardOneIDs = this.selectedCards.pop();
    let cardTwoIDs = this.selectedCards.pop();
    if(cardOneIDs['cardID'] === cardTwoIDs['cardID']) return this.handleMatch(cardOneIDs['elementID'],cardTwoIDs['elementID']);
    return this.resetCards(cardOneIDs['elementID'],cardTwoIDs['elementID']);
  }

  private handleMatch(e1: string, e2: string){
    this.updateCardState(e1,CardState.Hidden);
    this.updateCardState(e2,CardState.Hidden);
    this.matchesMade ++;
    if(this.matchesMade === (this.cardsWithState.length/2)) this.handleWin();
    this.selectedCards = [];
  }

  private updateCardState(elementID: string, newState: CardState){
    this.cardStateDelay(newState).subscribe((s: CardState)=>{
      this.cardsWithState[elementID].state = s;
    });
  }

  private resetCards(e1: string,e2:string){
    console.log(`RESETTING ELEMENTS: ${e1} and ${e2}`);
    this.updateCardState(e1,CardState.FaceDown);
    this.updateCardState(e2,CardState.FaceDown);
    this.selectedCards = [];
  }

  isVisible(cardWithState: CardWithState){
    if(cardWithState.state === CardState.Hidden) return false;
    return true;
  }

  cardStateDelay(newState:CardState): Observable<CardState>{
    if((newState === CardState.FaceDown) || (newState === CardState.Hidden )){
      return of(newState).pipe(delay(this.delayTime));
  }
    return of(newState);
  }

  handleWin(){
    this.winMessage = "You Won!";
    this.navigateWithDelay('/menu',this.delayTime);
  }

  navigateWithDelay(path: string, delayTime: number){
    return of(path).pipe(delay(delayTime)).subscribe((p: string)=>{
      this.router.navigateByUrl(path);
    })
  }
}
