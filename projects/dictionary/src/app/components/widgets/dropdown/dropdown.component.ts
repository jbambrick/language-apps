import { Component, OnInit } from '@angular/core';

type DropdownItem<T> = {
  'value': T,
  'display': string
}
type DropdownData<T> = {
  'prompt': string,
  'items': DropdownItem<T>[]
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  dropdownData: DropdownData<string> = {
    'prompt': 'favourite food',
    'items':   [
      {value: 'steak-0', display: 'Steak'},
      {value: 'pizza-1', display: 'Pizza'},
      {value: 'tacos-2', display: 'Tacos'}
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
