import {Component, OnInit} from '@angular/core';
import {Month, months} from '../_models/calendar/month.model';
import {CalendarService} from '../_service/calendar.service';
import {Category} from '../_models/calendar/category.model';
import {CategoryService} from '../_service/category.service';
import {getDefaultMonth, getDefaultYear, getFirstDateOfMonth, getYearsForSelector} from './calendar.util';
import {map, take} from 'rxjs/operators';
import {TaskService} from '../_service/task.service';
import {repeatabilityList, Task} from '../_models/calendar/task.model';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  updateCalendarEvent = new Subject<void>();

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

  onSelectMonth() {
    this.updateCalendarEvent.next();
  }

  onSelectYear() {
    this.updateCalendarEvent.next();
  }
}
