import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { MySqlService } from './services/my-sql.service';
import { ParksComponent } from './components/parks/parks.component';
import { RidesComponent } from './components/rides/rides.component';
import { RideDetailComponent } from './components/rides/ride-detail.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { SplashComponent } from './components/splash/splash.component';
import { MainComponent } from './components/main/main.component';
import { LeftHuggerComponent } from './components/left-hugger/left-hugger.component';
import { LeftSliderComponent } from './components/left-slider/left-slider.component';
import { MiddleSliderComponent } from './components/middle-slider/middle-slider.component';
import { RightSliderComponent } from './components/right-slider/right-slider.component';
import { RidePictureComponent } from './components/rides/ride-picture/ride-picture.component';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    RidesComponent,
    ParksComponent,
    RideDetailComponent,
    SearchBarComponent,
    HeaderComponent,
    SplashComponent,
    MainComponent,
    LeftHuggerComponent,
    LeftSliderComponent,
    MiddleSliderComponent,
    RightSliderComponent,
    RidePictureComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
