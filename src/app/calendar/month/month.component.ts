import { Component, OnInit, OnDestroy } from '@angular/core';
import { Month, months } from '../../_models/calendar/month.model';
import { Day } from '../../_models/calendar/day.model';
import { Task } from '../../_models/calendar/task.model';
import { TaskService } from '../../_service/task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { CalendarService } from 'src/app/_service/calendar.service';
import { Category } from 'src/app/_models/calendar/category.model';
import { CategoryService } from 'src/app/_service/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css'],
})
export class MonthComponent implements OnInit, OnDestroy {
  private monthSubscription: Subscription;
  private yearSubscription: Subscription;
  private categorySubscription: Subscription;
  private lastDayOfMonth: number = 0;

  monthsList: Month[] = months;
  selectedMonth: Month;
  selectedYear: number;
  days: Day[] = [];
  categories: Category[] = [];

  constructor(
    private taskService: TaskService,
    private calendarService: CalendarService,
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.yearSubscription = this.calendarService
      .getSelectedYear()
      .subscribe((year) => {
        this.selectedYear = year;
        this.generateCalendar();
      });

    this.monthSubscription = this.calendarService
      .getSelectedMonth()
      .subscribe((month) => {
        this.selectedMonth = month;
        this.generateCalendar();
      });

    this.categorySubscription = this.categoryService
      .getCategoryUpdatedListener()
      .subscribe((categories) => {
        this.categories = categories;
      });

    this.calendarService.setDefaultMonthAndYear();
    this.generateCalendar();
  }

  ngOnDestroy() {
    this.monthSubscription.unsubscribe();
    this.yearSubscription.unsubscribe();
    this.categorySubscription.unsubscribe();
  }

  setLastDayOfMonth() {
    let date = new Date(this.selectedYear, this.selectedMonth.id + 1, 0);
    this.lastDayOfMonth = date.getDate();
  }

  generateCalendar() {
    this.days = [];
    this.setLastDayOfMonth();
    const firstDate: string =
      this.selectedYear + '-' + this.selectedMonth.id + '-' + 1;
    console.log(this.taskService.getTasksForMonth(firstDate));
    this.generatePreviousMonth();
    this.generateMonth();
  }

  generatePreviousMonth() {
    const firstDate = new Date(this.selectedYear, this.selectedMonth.id, 1);
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
    const tasks: Task[] = null; //this.taskService.getDayTasks(date);
    let day: Day = {
      date: date,
      currentDate: false,
      tasks: tasks,
    };
    return day;
  }
  generateDay(num): Day {
    const date: Date = new Date(this.selectedYear, this.selectedMonth.id, num);
    const isCurrentDate: boolean = this.isCurrentDate(date);
    const tasks: Task[] = null; //this.taskService.getDayTasks(date);
    let day: Day = {
      date: date,
      currentDate: isCurrentDate,
      tasks: tasks,
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

  openTask(task: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      height: '550px',
      data: task,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.taskService.saveTask(result);
    });
  }

  test(){
    console.log("TEST");
  }
}
