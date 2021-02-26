import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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

  constructor( private memoryMatchService: MemoryMatchService, private route: ActivatedRoute ) { }

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
    });
  }

  handleCardClick(ids: CardID ){
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
  }

  private updateCardState(elementID: string, newState: CardState){
    this.cardsWithState[elementID].state = newState;
  }

  private resetCards(e1: string,e2:string){
    console.log(`RESETTING ELEMENTS: ${e1} and ${e2}`);
    this.updateCardState(e1,CardState.FaceDown);
    this.updateCardState(e2,CardState.FaceDown);
  }

  isVisible(cardWithState: CardWithState){
    if(cardWithState.state === CardState.Hidden) return false;
    return true;
  }
}
