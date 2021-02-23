import { Injectable } from '@angular/core';
import { pipe, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { DropdownData } from '../../components/widgets/dropdown/dropdown-data';
import { Term } from './term';
import { TermWithValues } from './term-with-values';
import { VocabularyList } from './vocabulary-list';

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

  getTermsForListByListID(id: string): Observable<TermWithValues[]>{
    let endpoint: string = `${this.endpoints['listTerms']}${id}`;
    return this.http.get(endpoint)
    .pipe(
      map((data:any)=>{
        let terms: TermWithValues[] =[];
         for(let datum of data){
          let currentTerm: TermWithValues = {
            'term': {
              'id': datum.term.id,
              'term': datum.term.term,
            },
            'variableValues': datum.variable_values
          };
          if(datum.term.audio?.length > 0){
            currentTerm.term.audioURL = `${this.baseAPIURL}${datum.term.audio[0].url}`;
            currentTerm.term.audioFormat = datum.term.audio[0].mime;
          } 
          terms.push(currentTerm);
         }
         return terms;
      })
    )
  }

  getAllVocabularyLists(){
    let endpoint: string = this.endpoints['vocabularyLists'];
    return this.http.get(endpoint);
  }

  getVocabularyListByID(id: string): Observable<VocabularyList>{
    let endpoint: string = `${this.endpoints['vocabularyLists']}${id}`;
    return this.http.get(endpoint)
    .pipe(
      map(data=>{
        let variables = this.parseVocabularyListForVariables(data);
        if(!variables) throw new Error(`failed to parse variables`);
        return {
          "name": data['name'],
          "name_english": data['name_english'],
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
      console.log(`and items of length ${variable.validValues.length}`)
      if(variable.type === 'dropbox'){
        let dropbox = this.parseDropbox(variable);
        if(!dropbox) throw new Error(`Failed to parse dropbox.`);
        console.log(`Pushing dropbox ${dropbox.prompt} to parsedVariables`);
        parsedVariables.dropboxes.push(dropbox);
      } 
      if(variable.type === 'checkbox') parsedVariables.checkboxes.push(this.parseCheckbox(variable));
    }
    return parsedVariables;
  }

  private parseCheckbox(variable){
    if(!variable.items) throw new Error(`Unable to parse checkbox: items undefined.`);
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
    if(!variable.validValues) throw new Error(`Unable to parse dropbox: items undefined.`);
    let output: DropdownData<string> = {
      "prompt": variable.name,
      "items": variable.validValues
    }
    console.log(`Parsed dropbox of length ${output.items.length}`);
    for(let v of output.items){
      console.log(v.value);
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
