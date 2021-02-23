import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DictionaryDataService } from '../../../services/dictionary-data/dictionary-data.service';
import { DropdownData } from '../../widgets/dropdown/dropdown-data';
import { DropdownItem } from '../../widgets/dropdown/dropdown-item';
import { VocabularyList } from '../../../services/dictionary-data/vocabulary-list';
import { ListVariable } from './list-variable';

@Component({
  selector: 'app-vocabulary-list',
  templateUrl: './vocabulary-list.component.html',
  styleUrls: ['./vocabulary-list.component.css']
})
export class VocabularyListComponent implements OnInit {
  selectedTerm: string = "";
  terms: any;
  vocabularyList: VocabularyList;
  listID: string;

  dropboxes: ListVariable<string>[] = [];
  checkboxes: ListVariable<boolean>[] = [];


  constructor( private dictionaryData: DictionaryDataService, private route: ActivatedRoute ) { }

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

  handleNewSelection(data: any){
    console.log(`Variable options updated.`);
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
