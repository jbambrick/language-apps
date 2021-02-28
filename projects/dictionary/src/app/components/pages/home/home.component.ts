import { Component, OnInit } from '@angular/core';

import { DropdownData } from '../../widgets/dropdown/dropdown-data';
import { DropdownItem } from '../../widgets/dropdown/dropdown-item';

import { AudioService } from 'audio';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  initialIndex: number = 1;

  selectedFood: string = "";

  dropdownData: DropdownData<string> = {
    "prompt": "favourite food: ",
    "items": [
      {"value": "P", "display": "Pizza"},
      {"value": "S", "display": "Soup"},
      {"value": "B", "display": "Burgers"}
    ]
  }

  checkboxData: DropdownData<boolean> = {
    "prompt": "usitative?",
    "items": [
      {"value": true, "display": "usually"},
      {"value": false, "display": " "}
    ]
  }

  constructor( private audioService: AudioService ) { }

  ngOnInit(): void {
  }

  handleNewSelection(i: DropdownItem<string>){
    this.selectedFood = i.display;
  }

}
