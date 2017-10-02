import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';

import { MySqlService } from '../../services/my-sql.service';
import { Park } from '../parks/parks.component';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css'],
  providers: [MySqlService]
})
export class RidesComponent implements OnInit {

  ridesList: Array<Ride>;
  selectedRideList: Array<Ride> = [];
  selectedRideStore: Array<Array<Ride>> = [];

  @Input() currentPark: Park;
  constructor(private _mySqlService: MySqlService) {}
  
  ngOnInit() {

    // this._mySqlService.getRides(this.currentPark.id)
    //   .subscribe(res => this.ridesList = res);
  }

  ngOnChanges(changes){
    // current selected Rides exist?
    if(changes.currentPark.previousValue) {
      this.selectedRideStore[changes.currentPark.previousValue.id] = this.selectedRideList;
    }
      // save current selected Rides
    
    // current park changes?
    if(changes.currentPark.currentValue && changes.currentPark.currentValue.id) {
      // get new rides
      this._mySqlService.getRides(changes.currentPark.currentValue.id)
        .subscribe(res => {
          // set new ride list
          this.ridesList = res;
          // selected Rides exist for new park?
          if(this.selectedRideStore[this.currentPark.id]) {
            this.selectedRideList = this.selectedRideStore[this.currentPark.id]
          } else {
            this.selectedRideList = [];
          }
        });
    }
  }

  selectRide(ride: Ride) {
    if(this.selectedRideList.indexOf(ride) === -1) {
      this.selectedRideList.push(ride);
    }
  }

  deselectRide(ride: Ride) {
    const i = this.selectedRideList.indexOf(ride);
    if(i === 0) {
      this.selectedRideList = this.selectedRideList.slice(1);
    } else if (i === this.selectedRideList.length - 1) {
      this.selectedRideList = this.selectedRideList.slice(0,-1)
    } else {
      this.selectedRideList = this.selectedRideList.slice(0, i)
                                  .concat(this.selectedRideList.slice(i + 1))
    }
  }
  
}

export class Ride {
  id: number;
  rideName: string;
}
