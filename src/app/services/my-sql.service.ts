import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Park } from '../components/parks/parks.component';
import { Ride } from '../components/rides/rides.component';

@Injectable()
export class MySqlService {
  parks: Array<Park>;
  rides: Array<Ride>;
  waitTimes: Array<any>;

  constructor(private _http: Http) { }

  getParks() {
    return this._http.get("/parks")
      .map(res => this.parks = res.json());
  }

  getRides(parkId: number) {
    return this._http.get(`/parks/${parkId}`)
      .map(res => this.rides = res.json());
  }

  getRideWaitTime(rideId: number) {
    return this._http.get(`/rides/${rideId}`)
      .map(res => this.waitTimes = res.json());
  }
}
