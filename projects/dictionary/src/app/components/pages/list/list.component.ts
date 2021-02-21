import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DictionaryDataService } from '../../../services/dictionary-data/dictionary-data.service';
import { DropdownData } from '../../widgets/dropdown/dropdown-data';
import { DropdownItem } from '../../widgets/dropdown/dropdown-item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  terms: any;
  vocabularyList: any;
  listID: string;

  dropdowns: DropdownData<string>[];
  checkboxes: DropdownData<boolean>[];


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
      console.log(list.variables);
    })
  }

  handleNewSelection(data: any){
    console.log(`Variable options updated.`);
  }

}
