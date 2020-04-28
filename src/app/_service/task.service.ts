import {Injectable} from '@angular/core';
import {Task} from '../_models/calendar/task.model';
import {CategoryService} from './category.service';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {localizeDateStr} from '../calendar/calendar.util';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[];
  private tasksUpdated = new Subject<void>();

  constructor(
    private categoryService: CategoryService,
    private http: HttpClient
  ) {
  }

  getTaskUpdatedListener(): Observable<void> {
    return this.tasksUpdated.asObservable();
  }

  getTasksForMonth(firstDateOfMonth: string): Observable<{ tasks: any }> {
    return this.http.get<{ tasks: any }>('http://localhost:3000/api/task/month/' + firstDateOfMonth);
  }

  setLoadedTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  getTasksPerDay(date: Date): Task[] {
    return this.tasks.filter(task => this.taskFilter(task, date));
  }

  addTask(task: Task): Observable<{ taskId: string }> {
    const backendTask = {
      name: task.name,
      description: task.description,
      startDate: task.startDate,
      endDate: task.endDate,
      time: task.time,
      repeatability: task.repeatability.id,
      category: task.category.id
    };

    return this.http.post<{ taskId: string }>('http://localhost:3000/api/task', backendTask);
  }

  updateTask(task: Task): Observable<any> {
    const backendTask = {
      id: task.id,
      name: task.name,
      description: task.description,
      startDate: task.startDate,
      endDate: task.endDate,
      time: task.time,
      repeatability: task.repeatability.id,
      category: task.category.id
    };

    return this.http.put('http://localhost:3000/api/task', backendTask);
  }

  deleteTask(taskId: string): Observable<any>{
    return this.http.delete('http://localhost:3000/api/task/' + taskId );
  }

  notifyUpdatedTask() {
    this.tasksUpdated.next();
  }

  private taskFilter(task: Task, date: Date): boolean {

    const startDate = localizeDateStr(task.startDate, date.getTimezoneOffset());
    const endDate = localizeDateStr(task.endDate, date.getTimezoneOffset());


    if (startDate.getTime() === date.getTime()) {
      return true;
    }

    if (endDate.getTime() === date.getTime() && task.repeatability.id < 2) {
      return true;
    }


    if (date.getTime() < startDate.getTime()
      || date.getTime() > endDate.getTime()) {
      return false;
    }

    if (task.repeatability.value === 'every day') {
      return true;
    }

    if (task.repeatability.value === 'every week' && startDate.getDay() === date.getDay()) {
      return true;
    }

    if (task.repeatability.value === 'every month' && startDate.getDate() === date.getDate()) {
      return true;
    }

    return task.repeatability.value === 'every year'
      && startDate.getDate() === date.getDate()
      && startDate.getMonth() === date.getMonth();
  }
}
