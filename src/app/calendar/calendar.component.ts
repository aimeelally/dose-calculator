import { Component, Input, OnInit } from '@angular/core';

export interface DosageCalendarWeek {
  dose: string;
  day1?: string;
  day2?: string;
  day3?: string;
  day4?: string;
  day5?: string;
  day6?: string;
  day7?: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() public dosages: {
    title: 'Round 1';
    dosagesByWeek: DosageCalendarWeek[];
  }[];

  ngOnInit() {}

  public getHeadersAsStringArr(dosage: any): string[] {
    let headerArr = ['header-dose'];
    for (let d in dosage.dosagesByDay[0]) {
      if (d.indexOf('day') !== -1) {
        headerArr.push(`header-${d}`);
      }
    }
    return headerArr;
  }

  public getHeadersAsObj(dosage: any): { id: string; title: string }[] {
    const headersAsStringArr = this.getHeadersAsStringArr(dosage);

    return headersAsStringArr.map((header, i) => {
      if (header === 'header-dose') {
        return {
          id: header,
          title: '',
        };
      }

      return {
        id: header,
        title: `Day ${i}`,
      };
    });
  }

  public getDisplayedColumns(dosage: any): string[] {
    let colArr = ['col-dose'];
    for (let d in dosage.dosagesByDay[0]) {
      if (d.indexOf('day') !== -1) {
        colArr.push(`col-${d}`);
      }
    }
    return colArr;
  }
}
