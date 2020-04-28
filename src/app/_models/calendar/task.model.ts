import { Time } from '@angular/common';
import { Category } from './category.model';

export class Task {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  time: Time;
  repeatability: Repeatability;
  category: Category;
}

export class Repeatability {
  id: number;
  value: string;
}

export const repeatabilityList: Repeatability[] = [
  { id: 0, value: "don't repeat" },
  { id: 1, value: 'every day' },
  { id: 2, value: 'every week' },
  { id: 3, value: 'every month' },
  { id: 4, value: 'every year' },
];
