import { Injectable } from '@angular/core';
import { Task } from '../_models/calendar/task.model';
import { CategoryService } from './category.service';
import { Category } from '../_models/calendar/category.model';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[];

  constructor(private categoryService: CategoryService) {}
  getDayTasks(date: Date): Task[] {
    switch (date.getDate()) {
      case 1:
        this.tasks = this.getMockTaskArray1(date);
        break;
      case 2:
        this.tasks = this.getMockTaskArray2(date);
        break;
      case 3:
        this.tasks = this.getMockTaskArray3(date);
        break;
      case 8:
        this.tasks = this.getMockTaskArray1(date);
        break;
      case 10:
        this.tasks = this.getMockTaskArray2(date);
        break;
      case 9:
        this.tasks = this.getMockTaskArray3(date);
        break;
      case 15:
        this.tasks = this.getMockTaskArray1(date);
        break;
      case 16:
        this.tasks = this.getMockTaskArray2(date);
        break;
      case 18:
        this.tasks = this.getMockTaskArray3(date);
        break;
      case 19:
        this.tasks = this.getMockTaskArray1(date);
        break;
      case 22:
        this.tasks = this.getMockTaskArray2(date);
        break;
      case 23:
        this.tasks = this.getMockTaskArray3(date);
        break;
      default:
        this.tasks = [];
    }
    return this.tasks;
  }

  getMockTaskArray1(date): Task[] {
    let tasks: Task[] = [];
    let category = this.categoryService.getCategoryById('1');

    let task: Task = {
      id: '1',
      name: 'Молочная каша',
      description: 'Молочная каша',
      date: date,
      time: null,
      category: category
    };

    tasks.push(task);
    return tasks;
  }

  getMockTaskArray2(date): Task[] {
    let tasks: Task[] = this.getMockTaskArray1(date).slice();
    let category = this.categoryService.getCategoryById('2');
    let task2: Task = {
      id: '2',
      name: 'Прививка БЦЖ',
      description: 'Заказать прививку в Драгобрате',
      date: date,
      time: null,
      category: category
    };
    tasks.push(task2);
    return tasks;
  }

  getMockTaskArray3(date): Task[] {
    let tasks: Task[] = this.getMockTaskArray2(date).slice();
    let category = this.categoryService.getCategoryById('3');

    let task3: Task = {
      id: '3',
      name: 'Купить коляску',
      description: 'Выбрать коляску на babycar.com',
      date: date,
      time: null,
      category: category
    };

    tasks.push(task3);
    return tasks;
  }
}
