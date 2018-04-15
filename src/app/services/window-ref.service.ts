import { Injectable } from '@angular/core';

@Injectable()
export class WindowRefService {

  getNativeWindow():any {
    return window;
  }

}
