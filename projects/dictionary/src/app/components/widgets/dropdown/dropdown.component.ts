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

  @Output() public onItemSelection = new EventEmitter<T>();
  emitSelection(){
    let valueOfSelectedItem: T = this._data.items[this.selectedIndex].value
    console.log(`You selected: ${valueOfSelectedItem}`);
    this.onItemSelection.emit(valueOfSelectedItem);
  }

  _data: DropdownData<T>;

  selectedIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
