import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from 'src/app/_models/calendar/category.model';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {MatDialog} from '@angular/material/dialog';
import {CategoryDialogComponent} from './category-dialog/category-dialog.component';
import {ConfirmDialogComponent} from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  @Input() public categories: Category[];

  @Output() public addCategoryEvent = new EventEmitter<Category>();
  @Output() public updateCategoryEvent = new EventEmitter<Category>();
  @Output() public deleteCategoryEvent = new EventEmitter<string>();
  @Output() public changeCategoryStatusEvent = new EventEmitter<Category>();

  constructor(
    public dialog: MatDialog
  ) {
  }

  onChangeCategoryStatus(category: Category, event: MatSlideToggleChange) {
    category.checked = event.checked;
    this.changeCategoryStatusEvent.emit(category);
  }

  onAddCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '240px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((response: Category) => {
      if (response) {
        this.addCategoryEvent.emit(response);
      }
    });
  }

  onEditCategory(category: Category) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '240px',
      height: '400px',
      data: category,
    });

    dialogRef.afterClosed().subscribe((response: Category) => {
      if (response) {
        this.updateCategoryEvent.emit(response);
      }
    });
  }

  onDeleteCategory(categoryId) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {message: 'Are you sure that you want to delete category?'},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCategoryEvent.emit(categoryId);
      }
    });
  }
}
