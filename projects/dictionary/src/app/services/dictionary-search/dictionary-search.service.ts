import { Injectable } from '@angular/core';
import { Query } from './query';
import { Parameter } from './parameter';
import { TermWithValues } from '../dictionary-data/term-with-values';

@Injectable({
  providedIn: 'root'
})
export class DictionarySearchService {

  constructor() { }

  findOneUniqueTerm(query: Query<any>, allTerms: TermWithValues[]){
    let results: TermWithValues[] = this.findAllTerms(query,allTerms);
    if(results.length === 1) return results[0];
    return null;
  }

  findAllTerms(query: Query<any>, allTerms: TermWithValues[]): TermWithValues[]{
    // query parameters set based on (parent) vocabulary list's 'validVariables'
    // ignore 'unregistered' such variables in termWithValue's values
    let results: TermWithValues[] = [];
    for(let t of allTerms){
      let match: boolean = true;
      for(let i = 0; i < query['parameters'].length; i++){
        let p = query['parameters'][i];
        if( !(allTerms['values'][p['name']] === p['value'])){
          match = false;
          continue;
        }
      }
      if(match) results.push(t);
    }
    return results;
  }

}
