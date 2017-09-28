import { Component, Input, OnInit } from '@angular/core';

import { Ride } from './rides.component';
import { MySqlService } from '../../services/my-sql.service';

@Component({
  selector: 'app-ride-detail',
  templateUrl: './ride-detail.component.html',
  styleUrls: ['./ride-detail.component.css'],
  providers: [MySqlService]
})
export class RideDetailComponent implements OnInit {

  waitTimes: Array<any>;
  averageTime: number;

  @Input() ride: Ride;
  constructor(private _mySqlService: MySqlService) { }

  ngOnInit() {
    this._mySqlService.getRideWaitTime(this.ride.id)
      .subscribe(res => {
        this.waitTimes = res.slice(0, 10);
        this.averageTime = (
          this.waitTimes
            .map(object => object.waitTime)
            .reduce((acc,time) => acc += time, 0)
        ) / this.waitTimes.length
      });
  }

}

