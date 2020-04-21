import {Component, OnInit} from '@angular/core';
import {Month, months} from '../_models/calendar/month.model';
import {CalendarService} from '../_service/calendar.service';
import {Category} from '../_models/calendar/category.model';
import {CategoryService} from '../_service/category.service';
import {getDefaultMonth, getDefaultYear, getYearsForSelector} from './calendar.util';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {

  public categories: Category[];
  selectedMonth: Month;
  monthsList: Month[] = months;
  selectedYear: number;
  years: number[] = [];

  constructor(private calendarService: CalendarService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getCategories()
      .pipe(take(1))
      .subscribe(categories => {
        this.categories = categories;
      });

    this.initVariables();
  }

  private initVariables() {
    this.selectedYear = getDefaultYear();
    this.selectedMonth = months[getDefaultMonth()];
    this.years = getYearsForSelector(this.selectedYear);
  }

  private getCategoryIndexById(categoryId): number {
    return this.categories.findIndex((c) => c.id === categoryId);
  }

  onSelectMonth() {
    this.calendarService.changeMonth(this.selectedMonth);
  }

  onSelectYear() {
    this.calendarService.changeYear(this.selectedYear);
  }

  onAddCategory(category: Category) {
    this.categoryService.addCategory(category)
      .subscribe(result => {
        category.id = result.categoryId;
        this.categories.push(category);
      });
  }

  onEditCategory(category: Category) {
    this.categoryService.updateCategory(category)
      .subscribe(result => {
        const index = this.getCategoryIndexById(category.id);
        this.categories[index] = category;
      });
  }

  onDeleteCategory(categoryId) {
    this.categoryService.deleteCategory(categoryId)
      .subscribe(result => {
        const index = this.getCategoryIndexById(categoryId);
        this.categories.splice(index, 1);
      });
  }

  onChangeCategoryStatus(category) {
    const index = this.getCategoryIndexById(category.id);
    this.categories[index].checked = category.checked;
    console.log(this.categories);
  }
}
