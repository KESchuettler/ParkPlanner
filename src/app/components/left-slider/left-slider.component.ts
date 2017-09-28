import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Park } from '../parks/parks.component';

@Component({
  selector: 'app-left-slider',
  templateUrl: './left-slider.component.html',
  styleUrls: ['./left-slider.component.css']
})
export class LeftSliderComponent {

  @Output() selectedPark: EventEmitter<Park> = new EventEmitter();
  currentPark: Park;

  constructor() { }

  updateSelectedPark(park) {
    this.currentPark = park;
    this.emitPark(park);
  }

  emitPark(park) {
    this.selectedPark.emit(park);
  }

}
