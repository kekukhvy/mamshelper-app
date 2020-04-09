import { Time } from '@angular/common';
import { Category } from './category.model';

export class Task {
  id: string;
  name: string;
  description: string;
  date: Date;
  time: Time;
  repeatability: Repeatability;
  category: Category;
}

export class Repeatability {
  id: number;
  value: string;
}

export const repeatabilityList: Repeatability[] = [
  { id: 1, value: "don't repeat" },
  { id: 2, value: 'every day' },
  { id: 3, value: 'every week' },
  { id: 4, value: 'every month' },
  { id: 5, value: 'every year' },
];
