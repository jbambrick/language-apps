import { Component, OnInit } from '@angular/core';
import { DictionaryDataService } from '../../../services/dictionary-data/dictionary-data.service';

@Component({
  selector: 'app-vocabulary-lists',
  templateUrl: './vocabulary-lists.component.html',
  styleUrls: ['./vocabulary-lists.component.css']
})
export class VocabularyListsComponent implements OnInit {

  lists = [
    {"id":1,"text":"to put on shoes"}
  ]

  constructor( private data: DictionaryDataService ) { }

  ngOnInit(): void {
    this.data.getAllVocabularyLists().subscribe((data:any)=>{

    })
  }

}
