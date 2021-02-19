import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe, Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MemoryCard } from './memory-card';
import { MemoryRound } from './memory-round';
import { Contributor } from './contributor';

@Injectable({
  providedIn: 'root'
})
export class MemoryMatchService {

  baseAPIURL: string = "https://api.tsilhqotinlanguage.ca";
  endpoints: any = {
    "getCard": `${this.baseAPIURL}/memory-cards`,
    "getRound": `${this.baseAPIURL}/memory-rounds`,
    "getCredits": "/apps/?name_english=Memory"
  };

  constructor(private http: HttpClient) { }

  getRoundByID(id: string): Observable<MemoryRound>{
    return this.http.get(`${this.endpoints.getRound}/${id}`)
    .pipe(
      catchError(error =>{
        let errorMsg: string;
        errorMsg = error.error instanceof ErrorEvent ? `Error: ${error.error.message}` : String(error.status);
        return throwError(errorMsg);
      })
    )
    .pipe(
      map((data:any)=>{
        return this.memoryRoundAdapter(data);
      })
    )
  }

  memoryRoundAdapter(apiRound: any){
    let round: any = [];
    round['cards'] = [];
    round['cardBackImageURL'] = this.mediaItemAdapter(apiRound.card_back);
    let numberOfCards = apiRound.cards.length;
    for(let i = 1; i<numberOfCards; i++){
      let card = apiRound.cards[i];
      round['cards'].push(this.memoryCardAdapter(card,round['cardBackImageURL']));
    }
    round['name'] = apiRound.name ? apiRound.name : apiRound.name_english;
    round['id'] = apiRound.id;
    round['credits'] = apiRound.credits;
    round['description'] = apiRound.description;
    round['contributor'] = this.contributorAdapter(apiRound.contributor);

    return round;
  }

  memoryCardAdapter(apiCard, cardBack){
    let card: MemoryCard;
    card['imageID'] = apiCard.id;
    card['frontImageURL'] = this.mediaItemAdapter(apiCard.card_front);
    card['backImageURL'] = this.mediaItemAdapter(cardBack);
    card['audioURL'] = this.mediaItemAdapter(apiCard.audio);
    return card;
  }

  mediaItemAdapter(media){
    return media.url;
  }

  testMessage(){
    return of("Hello.");
  }

  contributorAdapter(apiContributor){
    let contributor: Contributor;
    contributor['community'] = apiContributor.community;
    contributor['firstName'] = apiContributor.first_name;
    contributor['lastName'] = apiContributor.last_name;
    contributor['id'] = apiContributor.id;
    return contributor;
  }

}
