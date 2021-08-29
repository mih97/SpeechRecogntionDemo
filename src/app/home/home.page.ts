import { Component,ChangeDetectorRef } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/plugins/speech-recognition/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  matches : string[];
  isRecording: boolean;
  button : string;

  constructor(private speechRecognition : SpeechRecognition,private cd: ChangeDetectorRef) {}
  //constructor(){}

   stopListening() {
     this.speechRecognition.stopListening().then(() => {
       this.isRecording = false;
     });
    this.button = "stopListening was pressed"
   }

   getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
      this.button = "getPermission was pressed"
  }

   startListening() {
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true;

    this.button = "startListening was pressed"
   }
}
