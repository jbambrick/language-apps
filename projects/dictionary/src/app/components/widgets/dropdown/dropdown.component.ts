import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

import { DropdownData } from './dropdown-data';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent<T> implements OnInit {

  @Input() public set dropdownData(data: DropdownData<T>){
    console.log(`Setting dropdown data as: ${data}`);
    this._data = data;
  }

  _data: DropdownData<T>;

  constructor() { }

  ngOnInit(): void {
  }

}
