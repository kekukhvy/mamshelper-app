import {Component, OnInit} from '@angular/core';
import {Month, months} from '../_models/calendar/month.model';
import {getDefaultMonth, getDefaultYear, getYearsForSelector} from './calendar.util';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {

  selectedMonth: Month;
  monthsList: Month[] = months;
  selectedYear: number;
  years: number[] = [];

  constructor() {
  }

  ngOnInit() {
    this.initVariables();
  }

  private initVariables() {
    this.selectedYear = getDefaultYear();
    this.selectedMonth = months[getDefaultMonth()];
    this.years = getYearsForSelector(this.selectedYear);
  }
}
