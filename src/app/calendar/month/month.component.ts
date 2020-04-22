import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Month} from '../../_models/calendar/month.model';
import {Day} from '../../_models/calendar/day.model';
import {repeatabilityList, Task} from '../../_models/calendar/task.model';
import {MatDialog} from '@angular/material/dialog';
import {TaskDialogComponent} from '../task-dialog/task-dialog.component';
import {Category} from 'src/app/_models/calendar/category.model';
import {getFirstDateOfMonthISO, getLastDateOfMonth, isCurrentDate} from '../calendar.util';
import {CategoryService} from '../../_service/category.service';
import {Subscription} from 'rxjs';
import {TaskService} from '../../_service/task.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css'],
})
export class MonthComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedMonth: Month;
  @Input() selectedYear: number;

  private categorySub: Subscription;

  private tasks: Task[];
  private categories: Category[] = [];
  private lastDayOfMonth: number = 0;

  public days: Day[] = [];

  constructor(private dialog: MatDialog,
              private categoryService: CategoryService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.generateCalendar();
  }


  private getCategories() {
    this.categorySub = this.categoryService.getCategoryUpdatedListener()
      .subscribe(categories => {
        this.categories = categories;
        this.getTasks();
        console.log('Categories was updated');
      });
  }

  private getTasks() {
    const firstDateOfMonth = getFirstDateOfMonthISO(this.selectedMonth.id, this.selectedYear);
    this.taskService.getTasksForMonth(firstDateOfMonth)
      .pipe(
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
        })).subscribe(result => {
      this.tasks = result;
      console.log('tasks was updated', this.tasks);
    });
  }

  generateCalendar() {
    this.lastDayOfMonth = getLastDateOfMonth(this.selectedMonth.id, this.selectedYear);
    this.days = [];
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
        this.days.push(this.generateDayOfPreviousMonth(date));
      }
    }
  }

  generateMonth() {
    for (let i = 1; i <= this.lastDayOfMonth; i++) {
      let day: Day = this.generateDay(i);
      this.days.push(day);
    }
  }

  generateDayOfPreviousMonth(date: Date): Day {
    return {
      date: date,
      currentDate: false,
      tasks: null,
    };
  }

  generateDay(num): Day {
    const date: Date = new Date(this.selectedYear, this.selectedMonth.id, num);
    const tasks: Task[] = null; //this.taskService.getDayTasks(date);
    return {
      date: date,
      currentDate: isCurrentDate(date),
      tasks: tasks,
    };
  }


  openTask(task: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      height: '550px',
      data: task,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      //this.taskService.saveTask(result);
    });
  }
}
