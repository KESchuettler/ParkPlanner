import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';


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

  getRideWaitTime(rides: Array<Ride>) {
    return Observable.forkJoin(rides.map(ride => {
      return this._http.get(`/rides/${ride.id}`)
        .map(res => {
          return Object.assign(ride, { times: res.json() });
        })
    }))
  }
}
