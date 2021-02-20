import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

import { DropdownData } from './dropdown-data';
import { DropdownItem } from './dropdown-item';

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

  @Output() public onItemSelection = new EventEmitter<DropdownItem<T>>();
  emitSelection(){
    let selectedItem: DropdownItem<T> = this._data.items[this.selectedIndex];
    console.log(`You selected: ${selectedItem.display}`);
    this.onItemSelection.emit(selectedItem);
  }

  _data: DropdownData<T>;

  selectedIndex: number;

  constructor() { }

  ngOnInit(): void {
  }

  handleInput(data){
    if(!data?.target?.selectedIndex && !(data?.target.selectedIndex === 0)){
      console.log(`Selected index not defined on target.`);
      return;
    }

    this.selectedIndex = data.target.selectedIndex;
    this.emitSelection();
  }

}
