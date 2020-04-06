import { Injectable } from '@angular/core';
import { Category } from '../_models/calendar/category.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = this.init();
  private categoriesUpdated = new Subject<Category[]>();

  public getCategories(): Category[] {
    return [...this.categories];
  }

  getCategoryUpdatedListener() {
    return this.categoriesUpdated.asObservable();
  }

  public changeStatus(category: Category) {
    let index = this.categories.findIndex(c => c.id === category.id);
    this.categories[index] = category;
    this.categoriesUpdated.next([...this.categories]);
  }

  private init(): Category[] {
    const categories: Category[] = [];
    const category1: Category = {
      id: '1',
      name: 'Рацион',
      color: '#5eb37e',
      checked: true
    };

    const category2: Category = {
      id: '2',
      name: 'Здоровье',
      color: '#CD5A4B',
      checked: true
    };

    const category3: Category = {
      id: '3',
      name: 'ToDo',
      color: '#D7BA7D',
      checked: true
    };

    categories.push(category1);
    categories.push(category2);
    categories.push(category3);
    return categories;
  }
}
