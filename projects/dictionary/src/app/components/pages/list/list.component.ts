import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DictionaryService } from '../../../services/dictionary/dictionary.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  terms: any;
  listID: string;


  constructor( private dictionaryService: DictionaryService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.params
    .pipe(map(params=>params['id']))
    .subscribe((id:string)=>{
      this.listID = id;
    });

    this.dictionaryService.getTermsForListByListID("1").subscribe((terms: any)=>{
      this.terms = terms;
      for(let term of terms){
        console.log(`id for this term is: ${term.id}`);
      }
    })
  }

}
