import { Component, Input, OnInit } from '@angular/core';
import { DictionaryDataService } from '../../../services/dictionary-data/dictionary-data.service';
import { Term } from '../../../services/dictionary-data/term';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css']
})
export class TermComponent implements OnInit {

  term: Term;

  _id: string;
  @Input() public set termID(id:string){
    if(!id && !(id === "0")) throw new Error(`termID is undefined`);
    this._id = id;
  }
  constructor( private dictionaryDataService: DictionaryDataService ) { }

  ngOnInit(): void {
    this.dictionaryDataService.getTermByID(this._id).subscribe((term: Term)=>{
      console.log(`Getting term with id:${this._id} for the term widget.`)
      this.term =term;
    })
  }

}
