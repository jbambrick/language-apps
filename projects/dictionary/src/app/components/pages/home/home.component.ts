import { Component, OnInit } from '@angular/core';

import { DropdownData } from '../../widgets/dropdown/dropdown-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedFood: string = "";

  dropdownData: DropdownData<string> = {
    "prompt": "favourite food: ",
    "items": [
      {"value": "P", "display": "Pizza"},
      {"value": "S", "display": "Soup"},
      {"value": "B", "display": "Burgers"}
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

  handleNewSelection(v: string){
    this.selectedFood = v;
  }

}
