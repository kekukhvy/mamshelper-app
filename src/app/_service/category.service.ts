import { Injectable } from '@angular/core';
import { Category } from '../_models/calendar/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = this.init();

  private getCategories(): Category[] {
    return [...this.categories];
  }

  private init(): Category[] {
    const categories: Category[] = [];
    const category1: Category = {
      id: '1',
      name: 'Рацион',
      color: 'lightgreen'
    };

    const category2: Category = {
      id: '2',
      name: 'Здоровье',
      color: 'lightred'
    };

    const category3: Category = {
      id: '3',
      name: 'ToDo',
      color: 'lightyellow'
    };

    categories.push(category1);
    categories.push(category2);
    categories.push(category3);
    return categories;
  }
}
