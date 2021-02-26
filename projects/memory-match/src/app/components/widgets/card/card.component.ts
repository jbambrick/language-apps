import { Component, OnInit, Input } from '@angular/core';
import { MemoryCard } from '../../../types/types/memory-card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  _card: MemoryCard;
  _cardBackURL: string;
  image: string;

  constructor() { }

  @Input() public set card(value: MemoryCard){
    this._card = value;
  }

  @Input() public set cardBackURL(value: string){
    console.log(`setting card back url`)
    this._cardBackURL = value;
    this.image =this._cardBackURL;
    console.log(`image set to: ${this.image}`)
  }

  ngOnInit(): void {
  }

}
