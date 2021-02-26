import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CardState } from './card-state';
import { CardID } from './card-id';

let testCardBack: string = "diamonds.png";
let testCardFront: string = "dog.png";
let testCardBlank: string = " HIDDEN  ";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  public image: string = "";
  public visible: boolean = true;
  public active: boolean = true;

  // _cardID is shared among 2 matching card elements
  private _cardID: string;
  @Input() set cardID(value: string){
    this._cardID = value;
    this.image = this._cardID;
  };

  // _uniqueElementID is unique among all card elements
  private _uniqueElementID: string;
  @Input() set uniqueElementID(value: string){
    this._uniqueElementID = value;
  }

  private _state: CardState = CardState.FaceDown;
  @Input() set state(value: CardState){
    this._state = value;
    this.handleStateChange(this._state);
  }

  @Output() public cardClicked = new EventEmitter<CardID>();
  public sendIDsOnClick() {
    if(!this.active) return;
      this.cardClicked.emit({
        cardID: this._cardID,
        uniqueElementID: this._uniqueElementID});
      // console.log(`You clicked on tile: ${this._cardID}`);
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
      this.image=testCardBlank;
      console.log(`Current image: ${this.image}`);
      return
    } 

    if(s===CardState.FaceUp){
      this.image=testCardFront;
      this.active = false;
    } 
    
    if(s===CardState.FaceDown){
      this.image=testCardBack;
      this.active = true;
    } 
  }

}