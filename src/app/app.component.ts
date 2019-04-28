import { Component } from '@angular/core';
import {SpeechToTextService} from './services/speech-to-text.service'
import { TextToSpeechService } from './services/text-to-speech.service';
@Component({
  moduleId: module.id,
  providers: [SpeechToTextService, TextToSpeechService],
  selector: 'speech-to-text',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'app works!';
  isSpeechRecogEnabled : boolean = false;

  constructor(private speechToText: SpeechToTextService, private textToSpeech: TextToSpeechService){
  }

  toogleSpeech() {
    this.isSpeechRecogEnabled = !this.isSpeechRecogEnabled;
    console.log(this.isSpeechRecogEnabled);
    if (this.isSpeechRecogEnabled) {
      this.speechToText.record('en_US')
      .subscribe(
        value => this.title = value,
        error => console.log( error),
        () => console.log('completed'));
    } else {
      this.speechToText.stop();
    }
  }

  speak() {
    this.textToSpeech.speak(this.title);
  }
}
