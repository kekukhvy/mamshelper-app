import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Month} from '../../_models/calendar/month.model';
import {Day} from '../../_models/calendar/day.model';
import {repeatabilityList, Task} from '../../_models/calendar/task.model';
import {MatDialog} from '@angular/material/dialog';
import {TaskDialogComponent} from '../task-dialog/task-dialog.component';
import {Category} from 'src/app/_models/calendar/category.model';
import {getFirstDateOfMonthISO, getLastDateOfMonth, isCurrentDate} from '../calendar.util';
import {CategoryService} from '../../_service/category.service';
import {TaskService} from '../../_service/task.service';
import {map, take} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css'],
})
export class MonthComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedMonth: Month;
  @Input() selectedYear: number;

  private categorySub: Subscription;
  private taskSub: Subscription;

  private categories: Category[] = [];
  private lastDayOfMonth: number = 0;
  private isFirstInit = true;

  public days: Day[] = [];

  constructor(private dialog: MatDialog,
              private categoryService: CategoryService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.initCategoriesAndCalendar();
    this.taskSub = this.taskService.getTaskUpdatedListener()
      .subscribe(() => {
        this.generateCalendar();
      });
    this.isFirstInit = false;
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
    this.taskSub.unsubscribe();
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isFirstInit) {
      this.generateCalendar();
    }
  }


  private initCategoriesAndCalendar() {
    this.categorySub = this.categoryService.getCategoryUpdatedListener()
      .pipe(take(1))
      .subscribe(categories => {
        this.categories = categories;
        this.generateCalendar();
      });
  }

  private generateCalendar() {
    this.lastDayOfMonth = getLastDateOfMonth(this.selectedMonth.id, this.selectedYear);
    this.days = [];
    this.generatePreviousMonth();
    this.generateMonthWithTasks();
  }

  private generatePreviousMonth() {
    const firstDate = new Date(this.selectedYear, this.selectedMonth.id, 1);
    const shift: number = firstDate.getDay() === 0 ? 6 : firstDate.getDay() - 1;
    if (firstDate.getDay() !== 1) {
      for (let i = shift; i > 0; i--) {
        const date = new Date(firstDate);
        date.setDate(date.getDate() - i);
        this.days.push(this.generateDayOfPreviousMonth(date));
      }
    }
  }

  private generateMonthWithTasks() {
    const firstDateOfMonth = getFirstDateOfMonthISO(this.selectedMonth.id, this.selectedYear);
    this.taskService.getTasksForMonth(firstDateOfMonth)
      .pipe(
        take(1),
        map((tasksData) => {
          return tasksData.tasks.map((task) => {
            return {
              id: task._id,
              name: task.name,
              description: task.description,
              startDate: task.startDate,
              endDate: task.endDate,
              time: task.time,
              repeatability: repeatabilityList[task.repeatability],
              category: this.categoryService.getCategoryById(task.category)
            };
          });
        }))
      .subscribe(result => {
        this.taskService.setLoadedTasks(result);
        this.generateMonth();
      });
  }

  private generateMonth() {
    for (let i = 1; i <= this.lastDayOfMonth; i++) {
      let day: Day = this.generateDay(i);
      this.days.push(day);
    }
  }

  private generateDay(num): Day {
    const date: Date = new Date(this.selectedYear, this.selectedMonth.id, num);
    const tasks: Task[] = this.taskService.getTasksPerDay(date);
    return {
      date: date,
      currentDate: isCurrentDate(date),
      tasks: tasks,
    };
  }

  private generateDayOfPreviousMonth(date: Date): Day {
    return {
      date: date,
      currentDate: false,
      tasks: null,
    };
  }

  openTask(task: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      height: '550px',
      data: task,
      autoFocus: false,
    });

    dialogRef.componentInstance
      .deleteTaskEvent
      .pipe(
        take(1)
      )
      .subscribe(taskId => {
        this.deleteTask(taskId);
      });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.updateTask(result)
          .subscribe(() => {
            this.taskService.notifyUpdatedTask();
          });
      }
    });
  }

  deleteTask(taskId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {message: 'Are you sure that you want to delete task?'},
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.taskService.deleteTask(taskId)
            .subscribe(result => {
              this.taskService.notifyUpdatedTask();
            });
        }
      });
  }
}
