import { Component, Input, OnInit } from '@angular/core';

import { MySqlService } from '../../services/my-sql.service';
import { Park } from '../parks/parks.component';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css'],
  providers: [MySqlService]
})
export class RidesComponent implements OnInit {

  rides: Array<Ride>;
  selectedRideId: number;

  @Input() park: Park;
  constructor(private _mySqlService: MySqlService) {}
  
  ngOnInit() {
    this._mySqlService.getRides(this.park.id)
      .subscribe(res => this.rides = res);
  }

  selectRide(ride: Ride) {
    this.selectedRideId = ride.id;
  }
}

export class Ride {
  id: number;
  rideName: string;
}
