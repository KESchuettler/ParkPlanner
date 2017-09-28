import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MySqlService } from '../../services/my-sql.service';


@Component({
  selector: 'app-parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.css'],
  providers: [MySqlService]
})
export class ParksComponent {

  @Output() selectedPark: EventEmitter<Park> = new EventEmitter();
  parks: Array<Park>;
  currentPark: Park;
  // Create an instance of the MySqlService through dependency injection
  constructor(private _mySqlService: MySqlService) {
    // Access the MySqlService's getParks() method we defined
    this._mySqlService.getParks()
        .subscribe(res => this.parks = res);
  }

  selectPark(park: Park) {
    this.currentPark = park;
    this.emitPark(park);
  }

  emitPark(park: Park) {
    this.selectedPark.emit(park);
  }
}

export class Park {
  apiParkName: String;
  created_at: Date;
  hasFastPass: number;
  id: number;
  location: JSON;
  parkName: String;
  updated_at: Date;
}
