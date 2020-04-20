import { Component, OnInit } from '@angular/core';
import { Month, months } from '../_models/calendar/month.model';
import { CalendarService } from '../_service/calendar.service';

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

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.setDefaultMonthAndYear();
    this.generateYears();
  }

  onSelectMonth() {
    this.calendarService.changeMonth(this.selectedMonth);
  }

  onSelectYear() {
    this.calendarService.changeYear(this.selectedYear);
  }

  generateYears() {
    for (let i = -3; i <= 5; i++) {
      this.years.push(this.selectedYear + i);
    }
  }

  setDefaultMonthAndYear() {
    let date: Date = new Date();
    this.selectedMonth = this.monthsList[date.getMonth()];
    this.selectedYear = date.getFullYear();
  }
}
