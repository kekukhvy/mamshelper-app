import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Category } from 'src/app/_models/calendar/category.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {
  categoryForm: FormGroup;
  color = 'gray';
  editMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public categoryData: Category
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.categoryForm.controls;
  }
  onSave() {
    let category = new Category();
    category.id = this.f.id.value;
    category.name = this.f.name.value;
    category.color = this.color;
    category.checked = this.f.checked.value;
    this.dialogRef.close(category);
  }

  initForm() {
    if (this.categoryData) {
      this.categoryForm = this.fb.group({
        id: { value: this.categoryData.id, disabled: true },
        name: this.categoryData.name,
        color: this.categoryData.color,
        checked: this.categoryData.checked
      });
      this.color = this.categoryData.color;
    } else {
      this.categoryForm = this.fb.group({
        id: { value: 'AUTO', disabled: true },
        name: '',
        color: '',
        checked: false
      });
    }
  }
}
