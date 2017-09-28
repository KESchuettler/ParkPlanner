import { Component, OnInit, Input } from '@angular/core';

import { Park } from '../parks/parks.component';

@Component({
  selector: 'app-middle-slider',
  templateUrl: './middle-slider.component.html',
  styleUrls: ['./middle-slider.component.css']
})
export class MiddleSliderComponent implements OnInit {

  @Input() currentPark: Park
  constructor() { }

  ngOnInit() {
  }

}
