import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DictionaryDataService } from '../../../services/dictionary-data/dictionary-data.service';
import { DictionarySearchService } from '../../../services/dictionary-search/dictionary-search.service';
import { DropdownData } from '../../widgets/dropdown/dropdown-data';
import { DropdownItem } from '../../widgets/dropdown/dropdown-item';
import { VocabularyList } from '../../../services/dictionary-data/vocabulary-list';
import { ListVariable } from './list-variable';
import { ListQuery } from '../../../services/dictionary-search/list-query';
import { Parameter } from '../../../services/dictionary-search/parameter';
import { TermWithValues } from '../../../services/dictionary-data/term-with-values';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-vocabulary-list',
  templateUrl: './vocabulary-list.component.html',
  styleUrls: ['./vocabulary-list.component.css']
})
export class VocabularyListComponent implements OnInit {
  selectedTerm: TermWithValues;
  terms: TermWithValues[];
  vocabularyList: VocabularyList;
  listID: string;

  dropboxes: ListVariable<string>[] = [];
  checkboxes: ListVariable<boolean>[] = [];


  constructor( private dictionaryData: DictionaryDataService, private dictionarySearch: DictionarySearchService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.params
    .pipe(map(params=>params['id']))
    .subscribe((id:string)=>{
      this.listID = id;
    });

    this.dictionaryData.getTermsForListByListID("1").subscribe((terms: any)=>{
      this.terms = terms;
      for(let term of terms){
        console.log(`id for this term is: ${term.id}`);
      }
    });

    this.dictionaryData.getVocabularyListByID("1").subscribe((list: any)=>{
      this.vocabularyList = list;
      console.log(`Here's the first dropbox:`);
      console.log(list.variables.dropboxes);
      this.setDropboxes(list.variables.dropboxes);
    })
  }

  handleNewSelection(data: DropdownItem<any>){
    console.log(`Variable options updated.`);
    console.log(`Data: ${data.value}`);
    console.log(`Display: ${data.display}`);
    this.search(this.createSearchQuery());
  }

  private createSearchQuery(): ListQuery<any>{
    let q: ListQuery<any>;
    q = {
      'parameters': []
    }
    if(!(this.dropboxes?.length || this.checkboxes?.length)) throw new Error(`Cannot create search query when both dropboxes and checkboxes are undefined.`);
    if(this.dropboxes?.length){
      for(let d of this.dropboxes){
        let queryParameter: Parameter<string>;
        queryParameter = {
          'name': d.name,
          'value': d.currentValue.value
        }
        q.parameters.push(queryParameter);
      }
    }
    if(this.checkboxes?.length){
      for(let c of this.checkboxes){
        let queryParameter: Parameter<boolean>;
        queryParameter = {
          'name': c.name,
          'value': c.currentValue.value
        }
        q.parameters.push(queryParameter);
      }
    }
    return q;
  }

  search(q: ListQuery<any>){
    console.log(`Searching with query: ${q}`);
    let result: TermWithValues = this.dictionarySearch.findOneUniqueTerm(q,this.terms);
    if(result){
      console.log(`got a match: ${result}`);
    } else{
      console.log(`No luck this time!`);
    }
    console.log(`selected result`);
    console.log(result);
    this.selectedTerm = result;
  }

  playAudio(){
    console.log(`Now Playing ${this.selectedTerm.term.audioURL}`);
  }

  private setDropboxes(dropboxes){
    if((typeof(dropboxes) === "undefined")) {
      console.log(' NO DROPBOXES FOUND');
      return;
    }

    for(let d of dropboxes){
      this.dropboxes.push(new ListVariable(d,0,d.prompt,"dropbox"));
    }
  }

}
