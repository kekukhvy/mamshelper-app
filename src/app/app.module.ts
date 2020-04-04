import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './calendar/day/day.component'
import { MaterialModule } from './material.module';
import { MonthComponent } from './calendar/month/month.component';

@NgModule({
  declarations: [AppComponent, CalendarComponent, DayComponent, MonthComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
