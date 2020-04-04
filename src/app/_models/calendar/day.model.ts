import {Task} from './task.model';

export interface Day {
  date: Date;
  currentDate: boolean;
  tasks: Task[];
}
