import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, MatTableModule, MatSelectModule],
  exports: [CalendarComponent],
})
export class CalendarModule {}
