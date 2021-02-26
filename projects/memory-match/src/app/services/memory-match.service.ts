import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { MemoryCard } from '../types/types/memory-card';
import { MemoryRound } from '../types/types/memory-round';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemoryMatchService {

  constructor( private http: HttpClient ) { }

  private baseAPIURL: string = "https://api.tsilhqotinlanguage.ca";

  private endpoints: object = {
    'rounds': `${this.baseAPIURL}/memory-rounds/`,
    'cards': `${this.baseAPIURL}/memory-cards/`
  }

  getAllRounds(): Observable<MemoryRound[]>{
    return this.http.get(this.endpoints['rounds'])
    .pipe(
      map((data:any)=>{
        return data.map(r=>this.roundAdapter(r));
      })
    )
  }

  getRoundByID(id: string): Observable<MemoryRound>{
    let endpoint: string = `${this.endpoints['rounds']}${id}`;
    return this.http.get(endpoint)
    .pipe(
      map((data:any)=>{
        return this.roundAdapter(data);
      })
    )
  }

  private roundAdapter(apiRound: any): MemoryRound{
    let id: string = this.throwErrorIfUndefinedOrNull(apiRound.id)
    let name: string = this.returnValueOrNull(apiRound.name)
    let nameEnglish: string = this.returnValueOrNull(apiRound.name_english);
    let contributor: string = this.contributorAdapter(apiRound.contributor);
    let credits: object = this.returnValueOrNull(apiRound.credits);
    let cardbackImageURL: string = this.mediaAdapter(apiRound.card_back).url;
    let cards: MemoryCard[] = this.throwErrorIfUndefinedOrNull(apiRound.memory_cards).map(c=>this.cardAdapter(c));

    return {
      'id': id,
      'name': name,
      'nameEnglish': nameEnglish,
      'contributor': contributor,
      'credits': credits,
      'cardbackImageURL': cardbackImageURL,
      'cards': cards
    }
  }

  private cardAdapter(apiCard: any): MemoryCard{
    let id: string = this.throwErrorIfUndefinedOrNull(apiCard.id)
    let name: string = this.returnValueOrNull(apiCard.name);
    let contributor: string = this.contributorAdapter(apiCard.contributor);
    let credits: object = this.returnValueOrNull(apiCard.credits);
    let cardFrontURL: string = this.throwErrorIfUndefinedOrNull(this.mediaAdapter(apiCard.card_front).url);
    let audioURL: string = this.throwErrorIfUndefinedOrNull(this.mediaAdapter(apiCard.audio).url);
    return{
    'id': id,
    'name': name,
    'contributor': contributor,
    'credits': credits,
    'cardFrontURL': cardFrontURL,
    'audioURL': audioURL
    }
  }

  private throwErrorIfUndefinedOrNull(value: any){
    if(typeof value === 'undefined') throw new Error(`Value undefined.`);
    if(value === null) throw new Error('Value cannot be null');
    return value;
  }

  private returnValueOrNull(value: any){
    if(typeof value === 'undefined') return null;
    return value;
  }

  private contributorAdapter(apiContributor){
    if(!apiContributor) return null;
    let firstName: string = this.returnValueOrNull(apiContributor.first_name);
    let lastName: string = this.returnValueOrNull(apiContributor.last_name);
    if(!firstName && !lastName) return null;
    if(firstName && lastName) return `${firstName} ${lastName}`;
    return firstName? firstName : lastName;
  }

  private mediaAdapter(apiMediaItem){
    return {
      'url': this.throwErrorIfUndefinedOrNull(apiMediaItem.url)
    }
  }
}
