import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CardState } from './card-state';
import { MemoryCard } from '../../../types/types/memory-card';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  _audioURL: string;

  public image: string = "";
  public visible: boolean = true;
  public active: boolean = true;

  // _cardID is shared among 2 matching card elements
  private _cardBackURL: string;
  @Input() set cardBackURL(value: string){
    this._cardBackURL = value;
    this.image = this._cardBackURL;
  };

  _card: MemoryCard;
  @Input() set card(value: MemoryCard){
    this._card = value;
  }

  private _state: CardState = CardState.FaceDown;
  @Input() set state(value: CardState){
    this._state = value;
    this.handleStateChange(this._state);
  }

  @Output() public cardClicked = new EventEmitter<string>();
  public sendIDOnClick() {
    console.log(`The card has been clicked- widget`);
    // if(!this.active) return;
      this.cardClicked.emit(this._card.id);
  }

  constructor() { 
   }

  ngOnInit(): void {
    this.handleStateChange(CardState.FaceDown);
  }

  handleStateChange(s: CardState){
    if(s===CardState.Hidden){
      console.log(`updating state to hidden, state:${s}`);
      this.active = false;
      this.image=this._cardBackURL;
      console.log(`Current image: ${this.image}`);
      return
    } 

    if(s===CardState.FaceUp){
      this.image=this._card.cardFrontURL;
      this.active = false;
    } 
    
    if(s===CardState.FaceDown){
      this.image=this._cardBackURL;
      this.active = true;
    } 
  }

}