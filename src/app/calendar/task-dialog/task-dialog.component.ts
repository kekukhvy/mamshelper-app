import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/_models/calendar/task.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
})
export class TaskDialogComponent implements OnInit {
  taskForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public taskData: Task,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.taskForm.controls;
  }

  initForm() {
    let dp = new DatePipe('en-US');
    let format = 'y-MM-dd';

    if (this.taskData) {
      this.taskForm = this.fb.group({
        name: this.taskData.name,
        date: dp.transform(this.taskData.date, format),
        time: this.taskData.time,
      });
    }
  }
}
