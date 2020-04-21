import { Injectable } from '@angular/core';
import { Task, repeatabilityList } from '../_models/calendar/task.model';
import { CategoryService } from './category.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[];

  constructor(
    private categoryService: CategoryService,
    private http: HttpClient
  ) {}

  getTasksForMonth(firstDateOfMonth: string) {
    this.http
      .get<{ tasks: any }>('http://localhost:3000/api/task/month/2020-04-01')
      .pipe(
        map((tasksData) => {
          return tasksData.tasks.map((task) => {
            console.log(task._id);
            return {
              id: task._id,
              name: task.name,
              description: task.description,
              startDate: task.startDate,
              endDate: task.endDate,
              time: task.time,
              repeatability: repeatabilityList[task.repeatability],
              category: this.categoryService.getCategoryById(task.category),
            };
          });
        })
      )
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
  }

  saveTask(task) {
    console.log(task, ' was saved into back');
  }
}
