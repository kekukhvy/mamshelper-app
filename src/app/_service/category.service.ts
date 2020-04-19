import { Injectable } from '@angular/core';
import { Category } from '../_models/calendar/category.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [];
  private categoriesUpdated = new Subject<Category[]>();

  constructor(private http: HttpClient) {}

  public getCategories() {
    this.http
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
      )
      .subscribe((categories) => {
        this.categories = categories;
        this.categoriesUpdated.next([...this.categories]);
      });
  }

  public getCategoryUpdatedListener() {
    return this.categoriesUpdated.asObservable();
  }

  public addCategory(category: Category) {
    this.http
      .post<{ message: string; categoryId: string }>(
        'http://localhost:3000/api/category',
        category
      )
      .subscribe((response) => {
        category.id = response.categoryId;
        this.categories.push(category);
        this.categoriesUpdated.next([...this.categories]);
      });
  }

  public updateCategory(category: Category) {
    this.http
      .put('http://localhost:3000/api/category/' + category.id, category)
      .subscribe((response) => {
        let index = this.categories.findIndex((c) => c.id === category.id);
        this.categories[index] = category;
        this.categoriesUpdated.next([...this.categories]);
      });
  }

  public deleteCategory(categoryId) {
    this.http
      .delete('http://localhost:3000/api/category/' + categoryId)
      .subscribe((result) => {
        let index = this.categories.findIndex((c) => c.id === categoryId);
        this.categories.splice(index, 1);
        this.categoriesUpdated.next([...this.categories]);
      });
  }

  public changeStatus(category: Category) {
    let index = this.categories.findIndex((c) => c.id === category.id);
    this.categories[index] = category;
    this.categoriesUpdated.next([...this.categories]);
  }

  public getCategoryById(id: string) {
    return this.categories.find((category) => category.id === id);
  }
}
