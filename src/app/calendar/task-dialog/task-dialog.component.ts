import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Task,
  Repeatability,
  repeatabilityList,
} from 'src/app/_models/calendar/task.model';
import { DatePipe } from '@angular/common';
import { Category } from 'src/app/_models/calendar/category.model';
import { CategoryService } from 'src/app/_service/category.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
})
export class TaskDialogComponent implements OnInit {
  taskForm: FormGroup;
  categories: Category[] = [];
  repeatabilityList: Repeatability[] = repeatabilityList;
  isEdit: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public taskData: Task,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.categoryService
      .getCategoryUpdatedListener()
      .subscribe((categories) => {
        this.categories = categories;
      });
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
        category: this.taskData.category,
        repeatability: this.taskData.repeatability,
        description: this.taskData.description,
      });

      this.disableForm();
    }
  }

  onSave() {
    const task = {
      id: this.taskData.id,
      name: this.f.name.value,
      date: this.f.date.value,
      time: this.f.time.value,
      category: this.f.category.value,
      repeatability: this.f.repeatability.value,
      description: this.f.description.value,
    };
    this.dialogRef.close(task);
  }

  disableForm() {
    this.isEdit = false;
    this.f.name.disable();
    this.f.date.disable();
    this.f.time.disable();
    this.f.category.disable();
    this.f.repeatability.disable();
    this.f.description.disable();
  }

  enableForm() {
    this.isEdit = true;
    this.f.name.enable();
    this.f.date.enable();
    this.f.time.enable();
    this.f.category.enable();
    this.f.repeatability.enable();
    this.f.description.enable();
  }

  onEdit() {
    this.enableForm();
  }
}
