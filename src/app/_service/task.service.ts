import {Injectable} from '@angular/core';
import {Task, repeatabilityList} from '../_models/calendar/task.model';
import {CategoryService} from './category.service';
import {HttpClient} from '@angular/common/http';
import {first, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[];

  constructor(
    private categoryService: CategoryService,
    private http: HttpClient
  ) {
  }

  getTasksForMonth(firstDateOfMonth: string): Observable<{ tasks: any }> {
    return this.http.get<{ tasks: any }>('http://localhost:3000/api/task/month/' + firstDateOfMonth);
  }
}
