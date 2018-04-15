import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {WindowRefService} from './services/window-ref.service'
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WindowRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
