import {Component, OnInit} from '@angular/core';
import {Category} from 'src/app/_models/calendar/category.model';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {MatDialog} from '@angular/material/dialog';
import {CategoryDialogComponent} from './category-dialog/category-dialog.component';
import {ConfirmDialogComponent} from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import {CategoryService} from '../../_service/category.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  public categories: Category[];

  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .pipe(take(1))
      .subscribe(categories => {
        this.categories = categories;
        this.categoryService.setLoadedCategories(this.categories);
      });
  }

  private getCategoryIndexById(categoryId): number {
    return this.categories.findIndex((c) => c.id === categoryId);
  }

  private addCategory(category: Category) {
    this.categoryService.addCategory(category)
      .subscribe(result => {
        category.id = result.categoryId;
        this.categories.push(category);
        this.categoryService.setLoadedCategories(this.categories);
      });
  }

  private saveCategory(category: Category) {
    this.categoryService.updateCategory(category)
      .subscribe((result) => {
        const index = this.getCategoryIndexById(category.id);
        this.categories[index] = category;
        this.categoryService.setLoadedCategories(this.categories);
      });
  }

  private deleteCategory(categoryId: string) {
    this.categoryService.deleteCategory(categoryId)
      .subscribe(result => {
        const index = this.getCategoryIndexById(categoryId);
        this.categories.splice(index, 1);
        this.categoryService.setLoadedCategories(this.categories);
      });

  }

  onChangeCategoryStatus(category: Category, event: MatSlideToggleChange) {
    category.checked = event.checked;
  }

  onAddCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '240px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((response: Category) => {
      if (response) {
        this.addCategory(response);
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
        this.saveCategory(response);
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
        this.deleteCategory(categoryId);
      }
    });
  }
}
