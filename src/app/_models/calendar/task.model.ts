import { Time } from '@angular/common';
import { Category } from './category.model';

export interface Task {
  id: string;
  name: string;
  description: string;
  date: Date;
  time: Time;
  category: Category;
}
