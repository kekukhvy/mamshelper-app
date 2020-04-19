import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './calendar/day/day.component';
import { MaterialModule } from './material.module';
import { MonthComponent } from './calendar/month/month.component';
import { CategoriesComponent } from './calendar/categories/categories.component';
import { CategoryDialogComponent } from './calendar/categories/category-dialog/category-dialog.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ColorPickerModule } from 'ngx-color-picker';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { TaskDialogComponent } from './calendar/task-dialog/task-dialog.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DayComponent,
    MonthComponent,
    CategoriesComponent,
    CategoryDialogComponent,
    ConfirmDialogComponent,
    TaskDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationModule,
    BrowserAnimationsModule,
    MaterialModule,
    ColorPickerModule,
    HttpClientModule,
  ],
  providers: [
    // { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CategoryDialogComponent],
})
export class AppModule {}
