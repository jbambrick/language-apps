import { Injectable } from '@angular/core';
import { ListQuery } from './list-query';
import { Parameter } from './parameter';
import { TermWithValues } from '../dictionary-data/term-with-values';

@Injectable({
  providedIn: 'root'
})
export class DictionarySearchService {

  constructor() { }

  findOneUniqueTerm(query: ListQuery<any>, allTerms: TermWithValues[]){
    let results: TermWithValues[] = this.findAllTerms(query,allTerms);
    if(results.length === 1) return results[0];
    console.log(`Sorry, no results;`)
    return null;
  }

  findAllTerms(query: ListQuery<any>, allTerms: TermWithValues[]): TermWithValues[]{
    // query parameters set based on (parent) vocabulary list's 'validVariables'
    // ignore 'unregistered' such variables in termWithValue's values
    if(query.parameters?.length<1) throw new Error(`Ill-defined query: no parameters provided.`);
    let results: TermWithValues[] = [];
    for(let t of allTerms){
      console.log(`searching the term ${t.term}`);
      console.log(`searching term with variable values:`);
      console.log(t.variableValues);
      console.log(`t.variableValues[posessor] = ${t.variableValues['possessor']}`);
      let match: boolean = true;
      for(let i = 0; i < query.parameters.length; i++){
        let p = query.parameters[i];
        console.log(`The search parameters are ${p}`);
        let queryValue = p.value;
        let queryField = p.name;
        console.log(`The field to be queried is ${queryField}`);
        let dataValue = t.variableValues[queryField];
        console.log(`comparing the parameter value ${p.value}`);
        console.log(`to the data values[${queryField}]= ${t.variableValues[queryField]}`);
        if( !(dataValue === queryValue)){
          console.log(`No match found between ${dataValue} and ${queryValue}`);
          match = false;
          continue;
        }
      }
      if(match) results.push(t);
    }
    return results;
  }

}
