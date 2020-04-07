import { Component, OnInit, OnDestroy } from '@angular/core';
import { Month, months } from '../../_models/calendar/month.model';
import { Day } from '../../_models/calendar/day.model';
import { Task } from '../../_models/calendar/task.model';
import { TaskService } from '../../_service/task.service';
import { Category } from '../../_models/calendar/category.model';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/_service/category.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit, OnDestroy {
  monthsList: Month[] = months;
  currentMonth: Month;
  currentYear: number;
  years: number[] = [];
  lastDayOfMonth: number = 0;
  days: Day[] = [];
  private categorySub: Subscription;

  constructor(
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.setDefaultMonthAndYear();
    this.generateYears();
    this.generateCalendar();
  }

  ngOnDestroy() {
    this.categorySub.unsubscribe();
  }

  setDefaultMonthAndYear() {
    let date: Date = new Date();
    this.currentMonth = this.monthsList[date.getMonth()];
    this.currentYear = date.getFullYear();
  }

  generateYears() {
    for (let i = -3; i <= 5; i++) {
      this.years.push(this.currentYear + i);
    }
  }

  setLastDayOfMonth() {
    let date = new Date(this.currentYear, this.currentMonth.id + 1, 0);
    this.lastDayOfMonth = date.getDate();
  }

  generateCalendar() {
    this.days = [];
    this.setLastDayOfMonth();
    this.generatePreviousMonth();
    this.generateMonth();
  }
  generatePreviousMonth() {
    const firstDate = new Date(this.currentYear, this.currentMonth.id, 1);
    const shift: number = firstDate.getDay() === 0 ? 6 : firstDate.getDay() - 1;
    if (firstDate.getDay() !== 1) {
      for (let i = shift; i > 0; i--) {
        const date = new Date(firstDate);
        date.setDate(date.getDate() - i);
        const day: Day = this.generateDayWithDate(date);
        this.days.push(day);
      }
    }
  }
  generateMonth() {
    for (let i = 1; i <= this.lastDayOfMonth; i++) {
      let day: Day = this.generateDay(i);
      this.days.push(day);
    }
  }
  generateDayWithDate(date: Date): Day {
    const tasks: Task[] = this.taskService.getDayTasks(date);
    let day: Day = {
      date: date,
      currentDate: false,
      tasks: tasks
    };
    return day;
  }
  generateDay(num): Day {
    const date: Date = new Date(this.currentYear, this.currentMonth.id, num);
    const isCurrentDate: boolean = this.isCurrentDate(date);
    const tasks: Task[] = this.taskService.getDayTasks(date);
    let day: Day = {
      date: date,
      currentDate: isCurrentDate,
      tasks: tasks
    };
    return day;
  }

  isCurrentDate(date: Date) {
    let isCurrentDate: boolean;
    const curDate = new Date();
    isCurrentDate =
      curDate.getDate() === date.getDate() &&
      curDate.getMonth() === date.getMonth() &&
      curDate.getFullYear() === date.getFullYear();
    return isCurrentDate;
  }

  onSelectMonth() {
    this.generateCalendar();
  }

  onSelectYear() {
    this.generateCalendar();
  }
}
