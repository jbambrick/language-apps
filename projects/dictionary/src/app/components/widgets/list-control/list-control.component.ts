import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ListVariable } from '../../pages/vocabulary-list/list-variable';
import { DropdownItem } from '../../../components/widgets/dropdown/dropdown-item';

@Component({
  selector: 'app-list-control',
  templateUrl: './list-control.component.html',
  styleUrls: ['./list-control.component.css']
})
export class ListControlComponent <T> implements OnInit{

  _listVariable: ListVariable<T>;

  @Input() public set listVariable(v: ListVariable<T>){
    this._listVariable = v;
  }

  @Output() public onChange = new EventEmitter<DropdownItem<T>>();
  handleNewSelection(eventData: DropdownItem<T>){
    this._listVariable.currentValue = eventData;
    this.onChange.emit(this._listVariable.currentValue);
  }


  constructor() { }

  ngOnInit(): void {
  }



}
