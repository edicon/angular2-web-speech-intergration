import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as _ from "lodash";
import { WindowRefService } from './window-ref.service';

interface IWindow extends Window {
  webkitSpeechRecognition:any;
}

@Injectable()
export class SpeechToTextService {
  recognition: any;
  constructor(private zone: NgZone, private winRefService: WindowRefService) {
    const { webkitSpeechRecognition }: IWindow = <IWindow>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
   }

  record(language: string): Observable<string> {
    return Observable.create(observer => {
      this.recognition.onresult = (speech) => {
        let info = '';
        let interimTranscript = '';
        let finalTranscript = '';

        if (speech.results) {
            const result = speech.results[speech.resultIndex];
            const transcript = result[0].transcript;
            if (result.isFinal) {
                info = 'finalTranscript';
                if (result[0].confidence < 0.3) {
                    console.log("Unrecognized result - Please try again");
                } else {
                    finalTranscript = _.trim(transcript);
                    console.log("Did you said? -> " + finalTranscript + " , If not then say something else...");
                }
            } else {
              info = 'interimTranscript';
              interimTranscript = _.trim(transcript);
            }
        }
        this.zone.run(() => {
            observer.next(finalTranscript);
            /*
            observer.next({
              info: info,
              content: finalTranscript
            });
            */
        });
      };

      // TODO: ignoredOnEnd
      this.recognition.onerror = error => observer.error(error);
      this.recognition.onend = () => observer.complete();
      this.recognition.lang = language;

      this.recognition.start();
    });
  }

  stop(): void {
    this.recognition.stop();
  }

}
