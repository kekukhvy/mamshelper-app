import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Repeatability, repeatabilityList, Task,} from 'src/app/_models/calendar/task.model';
import {DatePipe} from '@angular/common';
import {Category} from 'src/app/_models/calendar/category.model';
import {CategoryService} from 'src/app/_service/category.service';

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
  isNew: boolean = false;
  isRepeatableTask = false;

  deleteTaskEvent = new EventEmitter<string>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public taskData: Task,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>
  ) {
  }

  ngOnInit(): void {
    this.categories = this.categoryService.getLoadedCategories();
    this.initForm();

    this.taskForm.controls.repeatability.valueChanges.subscribe((form) => {
      this.isRepeatableTask = form.id > 0;
    });
  }

  get f() {
    return this.taskForm.controls;
  }

  initForm() {
    let dp = new DatePipe('en-US');
    let format = 'y-MM-dd';
    if (this.taskData) {
      this.isRepeatableTask = this.taskData.repeatability.id > 0;

      this.taskForm = this.fb.group({
        name: this.taskData.name,
        startDate: dp.transform(this.taskData.startDate, format),
        endDate: dp.transform(this.taskData.endDate, format),
        time: this.taskData.time,
        category: this.taskData.category,
        repeatability: this.taskData.repeatability,
        description: this.taskData.description,
      });

      this.disableForm();

    } else {
      this.isNew = true;

      const currentDate = new Date();

      this.taskForm = this.fb.group({
        name: '',
        startDate: dp.transform(currentDate, format),
        endDate: dp.transform(currentDate, format),
        time: currentDate.toTimeString().slice(0, 5),
        category: '',
        repeatability: repeatabilityList[0],
        description: '',
      });
    }
  }

  onSave() {
    const task = {
      id: this.isNew ? null : this.taskData.id,
      name: this.f.name.value,
      startDate: this.f.startDate.value,
      endDate: this.f.endDate.value,
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
    this.f.startDate.disable();
    this.f.endDate.disable();
    this.f.time.disable();
    this.f.category.disable();
    this.f.repeatability.disable();
    this.f.description.disable();
  }

  enableForm() {
    this.isEdit = true;
    this.f.name.enable();
    this.f.startDate.enable();
    this.f.endDate.enable();
    this.f.time.enable();
    this.f.category.enable();
    this.f.repeatability.enable();
    this.f.description.enable();
  }

  onEdit() {
    this.enableForm();
  }

  onDeleteTask() {
    this.deleteTaskEvent.emit(this.taskData.id);
    this.dialogRef.close();
  }
}
