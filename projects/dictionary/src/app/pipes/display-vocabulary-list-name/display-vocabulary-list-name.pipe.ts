import { Pipe, PipeTransform } from '@angular/core';
import { VocabularyList } from '../../services/dictionary-data/vocabulary-list';

@Pipe({
  name: 'displayVocabularyListName'
})
export class DisplayVocabularyListNamePipe implements PipeTransform {

  transform(list:VocabularyList ): string {
    let name: string = list['name'];
    let nameEnglish: string = list['name_english'];
    if((!name)&&(!nameEnglish)) return "Unnamed List";
    if(name && nameEnglish) return `${name} (${nameEnglish})`;
    return name || nameEnglish;
  }

}
