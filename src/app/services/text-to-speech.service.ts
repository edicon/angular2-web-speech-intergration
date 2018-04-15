import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { WindowRefService } from './window-ref.service'


@Injectable()
export class TextToSpeechService {
  speechSynth  : any
  pitch: number = 1;
  rate: number = 1;
  voiceSelect: any;
	
  constructor(winRefService: WindowRefService) {
    this.speechSynth = winRefService.getNativeWindow().speechSynthesis;
    var voices = this.speechSynth.getVoices();
		console.log(voices.length)
		
		for(let i = 0; i < voices.length ; i++) {  
		   let voiceName = voices[i].name + ' (' + voices[i].lang + ')';
		   console.log(voiceName)
		  if(voiceName === 'Google US English (en-US)') {
			console.log("voiceName selected:" + voiceName)
			 this.voiceSelect =  voices[i];
			break;
		  }
		}
   }

  speak(text: string): void {
    var utterThis = new SpeechSynthesisUtterance(text);

    utterThis.onend = function (event) {
      console.log('SpeechSynthesisUtterance.onend');
    }
  
    utterThis.onerror = function (event) {
      console.error('SpeechSynthesisUtterance.onerror');
    }
  
    utterThis.voice = this.voiceSelect
    utterThis.pitch = this.pitch;
    utterThis.rate = this.rate;
    this.speechSynth.speak(utterThis);

  }

 

}