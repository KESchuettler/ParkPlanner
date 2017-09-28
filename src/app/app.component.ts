import { Component } from '@angular/core';

import { MySqlService } from './services/my-sql.service';
import { Park } from './components/parks/parks.component';

@Component({
  selector: 'app-root',
  template: '<app-splash><app-splash>',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'App'
}