import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DosageCalendarWeek } from '../calendar/calendar.component';

class Week {
  constructor() {}
}

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor() {}

  public makeUniqueId(): string {
    const len = 6;
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public calculateBreakdown(
    dosageForm: FormGroup,
    dosageUnit: AbstractControl
  ): { [key: string]: number }[] {
    return dosageForm.getRawValue().dosages.map((dosage) => {
      const {
        dosageToTake,
        frequencyType,
        numDaysPerWeek,
        numWeeksPerYear,
      } = dosage;

      if (!dosageUnit) {
        return null;
      }

      const dosageUnitArray = dosageUnit.value
        .split(/[ ,]+/)
        .map((value) => parseFloat(value))
        .filter((value) => value);

      const optimumDosageBreakdown = this.getOptimum(dosageUnitArray)(
        dosageToTake
      );
      let dosageBreakdown = this.calculateEachDosageBreakdown(
        optimumDosageBreakdown
      );

      if (optimumDosageBreakdown.length === 0) {
        // cannot calc dosage for this row, return null so row can be highlighted later
        return null;
      }

      const frequencyPerWeek = this.calculateFrequencyPerWeek(
        frequencyType,
        numDaysPerWeek
      );
      for (var i in dosageBreakdown) {
        dosageBreakdown[i] =
          dosageBreakdown[i] * frequencyPerWeek * numWeeksPerYear;
      }
      return dosageBreakdown;
    });
  }

  public generateCalendarData(
    dosageForm: FormGroup,
    dosageUnit: AbstractControl
  ): any {
    return dosageForm.getRawValue().dosages.map((dosage, i) => {
      const {
        dosageToTake,
        frequencyType,
        numDaysPerWeek,
        numWeeksPerYear,
      } = dosage;

      if (!dosageUnit.value) {
        return null;
      }

      const dosageUnitArray = dosageUnit.value
        .split(/[ ,]+/)
        .map((value) => parseFloat(value))
        .filter((value) => value);

      const optimumDosageBreakdown = this.getOptimum(dosageUnitArray)(
        dosageToTake
      );
      let dosageBreakdown = this.calculateEachDosageBreakdown(
        optimumDosageBreakdown
      );

      let dailyBreakdown = {};
      for (let day = 1; day <= numDaysPerWeek; day++) {
        if (!dailyBreakdown[`day${day}`]) {
          dailyBreakdown[`day${day}`] = '';
        }
      }

      const frequencyPerDay = this.getFrequency(frequencyType);
      let dosageString = `<strong>${dosageToTake}mg</strong><br>`;
      for (let dose in dosageBreakdown) {
        dosageString += `${dosageBreakdown[dose]} x ${dose}mg<br>`;
      }

      let dosagesByDay = Array.from({ length: frequencyPerDay }, (d, i) => {
        const shallowDailyBreakdown = Object.assign(dailyBreakdown);

        for (let d in shallowDailyBreakdown) {
          shallowDailyBreakdown[d] = dosageString;
        }

        d = {
          dose: `Dose ${i + 1}`,
          ...shallowDailyBreakdown,
        };

        return d;
      });

      const dosagesByWeek = [];
      for (let week = 1; week <= numWeeksPerYear; week++) {
        dosagesByWeek.push({
          title: `Week ${week}`,
          dosagesByDay,
        });
      }

      return {
        title: `Round ${i + 1}`,
        dosagesByWeek,
      };
    });
  }

  private calculateEachDosageBreakdown(breakdown: number[]) {
    const obj = breakdown.reduce((pre, curr) => {
      if (pre[curr]) {
        pre[curr]++;
      } else {
        pre[curr] = 1;
      }
      return pre;
    }, {});

    return obj;
  }

  private getOptimum(coins: number[]): (amount: number) => number[] {
    let change;
    let cache = {};
    return (change = (amount: number) => {
      if (!amount) return [];

      if (cache[amount]) return cache[amount].slice(0);

      let min = [];
      let newMin;
      let newAmount;

      coins.forEach((coin) => {
        if (
          (newAmount = amount - coin) >= 0 &&
          ((newMin = change(newAmount)).length < min.length - 1 ||
            !min.length) &&
          (newMin.length || !newAmount)
        ) {
          min = [coin].concat(newMin);
        }
      });
      return (cache[amount] = min).slice(0);
    });
  }

  private calculateFrequencyPerWeek(
    frequencyType: string,
    numDaysPerWeek: number
  ): number {
    return this.getFrequency(frequencyType) * numDaysPerWeek;
  }

  private getFrequency(frequencyType: string): number {
    switch (frequencyType) {
      case 'od':
      case 'ow':
        return 1;
      case 'bd':
        return 2;
      case 'tds':
        return 3;
      case 'qds':
        return 4;
    }
  }
}
