import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { WindowRefService } from './window-ref.service'

interface IWindow extends Window {
  webkitSpeechRecognition:any;
}

@Injectable()
export class SpeechToTextService {
  recognition  : any
  constructor(private zone: NgZone, private winRefService: WindowRefService) {
    const { webkitSpeechRecognition }: IWindow = <IWindow>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
   }

  record(language: string): Observable<string> {
    return Observable.create(observer => {
      this.recognition.onresult = e => this.zone.run( () => { 
        observer.next(e.results.item(e.results.length -1).item(0).transcript) 
      });


      this.recognition.onerror = e => observer.error(e);
      this.recognition.onend = () => observer.complete();
      this.recognition.lang = language;
      this.recognition.start();
    });
  }

  stop(): void {
    this.recognition.stop();
  }

}