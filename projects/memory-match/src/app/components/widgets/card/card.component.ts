import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardID } from './card-id';
import { MemoryCard } from '../../../types/types/memory-card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  _card: MemoryCard;
  _cardBackURL: string;
  _elementID: string;
  image: string;

  constructor() { }

  @Input() public set card(value: MemoryCard){
    if(!value) throw new Error(`Cannot set card property to undefined`);
    if(!value.id) throw new Error(`Card must have an id property`);
    this._card = value;
  }

  @Input() public set elementID(value: string){
    if(value.length < 1) throw new Error(`Identifier must be non-empty string.`)
    this._elementID = value;
  }

  @Input() public set cardBackURL(value: string){
    this._cardBackURL = value;
    this.image =this._cardBackURL;
  }

  @Output() public cardClicked = new EventEmitter<CardID>();
  emitCardAndElementIDs(){
    if(!this._card?.id) throw new Error(`Card ID is undefined.`);
    if(!this._elementID) throw new Error(`Element ID is undefined`);
    let ids: CardID = new CardID(this._card.id,this._elementID);
    this.cardClicked.emit(ids);
  }

  ngOnInit(): void {
  }

}
