import { Component, OnInit } from '@angular/core';
import { DictionaryDataService } from '../../../services/dictionary-data/dictionary-data.service';
import { Term } from '../../../services/dictionary-data/term';
import { TermWithValues } from '../../../services/dictionary-data/term-with-values';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  terms: Term[] = [];

  constructor( private dictionaryDataService: DictionaryDataService ) { }

  ngOnInit(): void {
    this.dictionaryDataService.getAllTerms().subscribe((data: Term[])=>{
      this.terms = data;
    })
  }

}
