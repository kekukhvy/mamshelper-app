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

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DayComponent,
    MonthComponent,
    CategoriesComponent,
    CategoryDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationModule,
    BrowserAnimationsModule,
    MaterialModule,
    ColorPickerModule
  ],
  providers: [
    // { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CategoryDialogComponent]
})
export class AppModule {}
