import { Component } from '@angular/core';

import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'App'
    
    // Define a parks property to hold our user data
    parks: Array<any>;

    // Create an instance of the DataService through dependency injection
    constructor(private _dataService: DataService) {

      // Access the Data Service's getParks() method we defined
      this._dataService.getParks()
          .subscribe(res => this.parks = res);
    }
}