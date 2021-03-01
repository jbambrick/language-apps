import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DropdownData } from '../dropdown/dropdown-data';
import { DropdownItem } from '../dropdown/dropdown-item';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {

  _checked: boolean;
  @Input() public set checked(c: boolean){
    this._checked = c;
  }

  _data: DropdownData<boolean>;
  @Input() public set checkboxData(data: DropdownData<boolean>){
    console.log(`Setting checkbox data.`)
    if(!this.isValidCheckboxData(data)) throw new Error(`Invalid checkbox data.`);
    this._data = data;
  }

  @Output() public onChange = new EventEmitter<DropdownItem<boolean>>();
  emitState(){
    let selectedItem: DropdownItem<boolean> = this.getItemFromBoolean(this._checked);
    console.log(`You selected: ${selectedItem.value}: ${selectedItem.display}`);
    this.onChange.emit(selectedItem);
  }

  constructor() { }

  ngOnInit(): void {
  }

  private toggle(b: boolean){
    return !b;
  }
  private getItemFromBoolean(b: boolean){
    let items: DropdownItem<boolean>[] = this._data.items;
    for(let i of items){
      if(i.value === b) return i;
    }
    throw new Error(`No checkbox data found for ${b}`);
  }

  private isValidCheckboxData(d: DropdownData<boolean>){
    if(!(d.items.length === 2)) return false; // 1 display, value pair for true, 1 for false
    let zerothValue: boolean = d.items[0].value;
    let firstValue: boolean = d.items[1].value;
    if(zerothValue === firstValue) return false; // both true or both false, not acceptable
    return true; 
  }

  toggleState(){
    this._checked = this.toggle(this._checked);
    this.emitState();
  }

}
