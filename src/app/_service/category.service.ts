import {Injectable} from '@angular/core';
import {Category} from '../_models/calendar/category.model';
import {Subject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [];
  private categoriesUpdated = new Subject<Category[]>();

  constructor(private http: HttpClient) {
  }

  public getCategories(): Observable<Category[]> {
    return this.http
      .get<{ categories: any }>('http://localhost:3000/api/category')
      .pipe(
        map((categoryData) => {
          return categoryData.categories.map((category) => {
            return {
              id: category._id,
              name: category.name,
              color: category.color,
              checked: category.checked,
            };
          });
        })
      );
  }

  public getCategoryUpdatedListener() {
    return this.categoriesUpdated.asObservable();
  }

  public addCategory(category: Category): Observable<{ message: string; categoryId: string }> {
    return this.http
      .post<{ message: string; categoryId: string }>(
        'http://localhost:3000/api/category',
        category
      );
  }

  public updateCategory(category: Category): Observable<any> {
    return this.http
      .put('http://localhost:3000/api/category/' + category.id, category);
  }

  public deleteCategory(categoryId): Observable<any> {
    return this.http
      .delete('http://localhost:3000/api/category/' + categoryId);
  }

  public changeStatus(category: Category) {
    let index = this.categories.findIndex((c) => c.id === category.id);
    this.categories[index] = category;
    this.categoriesUpdated.next([...this.categories]);
  }

  public getCategoryById(id: string): Category {
    return this.categories.find((category) => category.id === id);
  }
}
