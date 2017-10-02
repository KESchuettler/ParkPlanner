import { Component } from '@angular/core';

import { Park } from '../parks/parks.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  currentPark: Park;
  constructor() { }

  updateCurrentPark(park: Park) {
    this.currentPark = park;
  }
}
