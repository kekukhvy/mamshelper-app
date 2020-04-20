import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Month, months } from '../_models/calendar/month.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private selectedYear = new Subject<number>();
  private selectedMonth = new Subject<Month>();

  getSelectedYear() {
    return this.selectedYear.asObservable();
  }

  getSelectedMonth() {
    return this.selectedMonth.asObservable();
  }

  changeYear(year) {
    this.selectedYear.next(year);
  }

  changeMonth(month) {
    this.selectedMonth.next(month);
  }

  setDefaultMonthAndYear() {
    let date: Date = new Date();
    this.selectedMonth.next(months[date.getMonth()]);
    this.selectedYear.next(date.getFullYear());
  }
}
