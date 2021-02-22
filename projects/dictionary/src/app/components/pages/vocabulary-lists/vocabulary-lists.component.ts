import { Component, OnInit } from '@angular/core';
import { DictionaryDataService } from '../../../services/dictionary-data/dictionary-data.service';
import { VocabularyList } from '../../../services/dictionary-data/vocabulary-list';

@Component({
  selector: 'app-vocabulary-lists',
  templateUrl: './vocabulary-lists.component.html',
  styleUrls: ['./vocabulary-lists.component.css']
})
export class VocabularyListsComponent implements OnInit {

  lists: VocabularyList[];

  constructor( private data: DictionaryDataService ) { }

  ngOnInit(): void {
    this.data.getAllVocabularyLists().subscribe((data:any)=>{
      this.lists = data;
    })
  }

}
