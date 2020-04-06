import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_models/calendar/category.model';
import { CategoryService } from 'src/app/_service/category.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories: Category[];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }
  onChangeCategoryStatus(category: Category, event: MatSlideToggleChange) {
    category.checked = event.checked;
    this.categoryService.changeStatus(category);
  }
}
