import { Pipe, PipeTransform } from '@angular/core';
import { MemoryRound } from '../../types/types/memory-round';

@Pipe({
  name: 'roundDisplay'
})
export class RoundDisplayPipe implements PipeTransform {

  transform(value: MemoryRound): string {
    if(!value.name && !value.nameEnglish) return "Unnamed Round";
    if(value.name && value.nameEnglish) return `${value.name} (${value.nameEnglish})`;
    return value.name ? value.name : value.nameEnglish;
  }

}
