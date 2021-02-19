import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private baseAPIURL: string = "https://api.tsilhqotinlanguage.ca";

  private endpoints: Object = {
    "listTerms": `${this.baseAPIURL}/list-terms/?vocabulary_list=`
  }

  constructor( private http: HttpClient ) { }

  getTermsForListByListID(id: string){
    let endpoint: string = `${this.endpoints['listTerms']}${id}`;
    return this.http.get(endpoint)
    .pipe(
      map((data:any)=>{
        let terms = [];
         for(let datum of data){
          let currentTerm = {};
          currentTerm['id'] = datum.term.id;
          currentTerm['term'] = datum.term.term;
          currentTerm['variableValues'] = datum.variable_values;
          terms.push(currentTerm);
          console.log('term id')
          console.log(datum.term.id);
         }
         console.log(`Returning terms: ${terms}`);
         console.log(`terms[o].id: ${terms[0].id}`);
         return terms;
      })
    )
  }
}
