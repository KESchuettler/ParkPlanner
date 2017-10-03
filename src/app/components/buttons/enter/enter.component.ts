import { Component, Output, EventEmitter } from '@angular/core';

import { MySqlService } from '../../../services/my-sql.service';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css'],
  providers: [MySqlService]
})
export class EnterComponent {

  @Output() buttonClick: EventEmitter<any> = new EventEmitter();
  constructor(private _mySqlService: MySqlService) { }

  emitClick($event) {
    this.buttonClick.emit($event);
  }

}
