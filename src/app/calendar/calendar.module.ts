import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, MatTableModule],
  exports: [CalendarComponent],
})
export class CalendarModule {}
