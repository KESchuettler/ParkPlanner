import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result: any;

  constructor(private _http: Http) { }

  getParks() {
    const that = this;
    return this._http.get("/parks")
      .map(result => {
        console.log(result.json());
        return that.result = result.json()}
      );
  }

}
