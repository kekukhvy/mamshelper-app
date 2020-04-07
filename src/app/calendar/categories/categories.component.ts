import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/_models/calendar/category.model';
import { CategoryService } from 'src/app/_service/category.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { Subscription, SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public categories: Category[];
  private categorySub: Subscription;

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.categorySub = this.categoryService
      .getCategoryUpdatedListener()
      .subscribe(categories => (this.categories = categories));
  }

  ngOnDestroy() {
    this.categorySub.unsubscribe();
  }

  onChangeCategoryStatus(category: Category, event: MatSlideToggleChange) {
    category.checked = event.checked;
    this.categoryService.changeStatus(category);
  }

  onAddCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '240px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe((response: Category) => {
      if (response) {
        this.categoryService.addCategory(response);
      }
    });
  }

  onEditCategory(category: Category) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '240px',
      height: '400px',
      data: category
    });

    dialogRef.afterClosed().subscribe((response: Category) => {
      if (response) {
        this.categoryService.updateCategory(response);
      }
    });
  }

  onDeleteCategory(category) {
    console.log(category);
  }
}
