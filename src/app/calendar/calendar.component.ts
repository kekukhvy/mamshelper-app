import {Component, OnInit} from '@angular/core';
import {Month, months} from '../_models/calendar/month.model';
import {getDefaultMonth, getDefaultYear, getYearsForSelector} from './calendar.util';
import {TaskDialogComponent} from './task-dialog/task-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {TaskService} from '../_service/task.service';

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

  constructor(private dialog: MatDialog, private taskService: TaskService) {
  }

  ngOnInit() {
    this.initVariables();
  }

  private initVariables() {
    this.selectedYear = getDefaultYear();
    this.selectedMonth = months[getDefaultMonth()];
    this.years = getYearsForSelector(this.selectedYear);
  }

  addTask() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      height: '550px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.taskService.addTask(result)
        .subscribe((taskId => {
          this.taskService.notifyUpdatedTask();
        }));
    });
  }
}
