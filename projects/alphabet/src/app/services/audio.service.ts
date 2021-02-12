import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  audio: any;

  constructor( ) {
    this.audio = new Audio();
   }

   private setAudioSourceURL(audioURL: string){
     this.audio.src = audioURL;
   }

   playAudioFromURL(audioURL: string){
     this.setAudioSourceURL(audioURL);
     this.audio.play();
   }
}
