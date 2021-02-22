import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { DropdownData } from '../../components/widgets/dropdown/dropdown-data';

@Injectable({
  providedIn: 'root'
})
export class DictionaryDataService {

  private baseAPIURL: string = "https://api.tsilhqotinlanguage.ca";

  private endpoints: Object = {
    "listTerms": `${this.baseAPIURL}/list-terms/?vocabulary_list=`,
    "vocabularyLists": `${this.baseAPIURL}/vocabulary-lists/`
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

  getAllVocabularyLists(){
    let endpoint: string = this.endpoints['vocabularyLists'];
    return this.http.get(endpoint);
  }

  getVocabularyListByID(id: string){
    let endpoint: string = `${this.endpoints['vocabularyLists']}${id}`;
    return this.http.get(endpoint)
    .pipe(
      map(data=>{
        let variables = this.parseVocabularyListForVariables(data);
        if(!variables) throw new Error(`failed to parse variables`);
        return {
          "name": data['name'],
          "id": data['id'],
          "variables": variables,
          "credits": data['credits'],
          "comments": data['comments']
        }
      })
    )
  }

  private parseVocabularyListForVariables(vocabularyList){
    let apiVariables = vocabularyList.variables;
    if(!apiVariables) throw new Error(`Variables undefined on vocabulary list.`);
    let parsedVariables = {
      "checkboxes": [],
      "dropboxes": []
    };
    for(let variable of apiVariables){
      if(!variable.type) throw new Error(`Encountered variable of unknown type.`);
      console.log(`Processing variable ${variable.name}`);
      if(variable.type === 'dropbox'){
        let dropbox = this.parseDropbox(variable);
        if(!dropbox) throw new Error(`Failed to parse dropbox.`);
        parsedVariables.dropboxes.push(dropbox);
      } 
      if(variable.type === 'checkbox') parsedVariables.checkboxes.push(this.parseCheckbox(variable));
    }
    return parsedVariables;
  }

  private parseCheckbox(variable){
    if(!variable.items) throw new Error(`Unable to parse checkbox: items undefined.`)
    let newItems = [];
    for(let item of variable.items){
      newItems.push(this.parseCheckbox(item));
    }
    let output: DropdownData<boolean> = {
      "prompt": variable.name,
      "items": newItems
    }
    return output;
  }

  private parseDropbox(variable){
    let output: DropdownData<string> = {
      "prompt": variable.name,
      "items": variable.validValues
    }
    return output;
  }

  private parseCheckboxItem(item){
    return item.map(i=>{
      return {
        "value": Boolean(i.value),
        "display": i.display
      }
    })
  }
}
