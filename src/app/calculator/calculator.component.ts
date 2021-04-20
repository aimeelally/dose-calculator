import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Dosage } from './calculator.model';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  public dosageForm: FormGroup;

  public frequencyTypes = ['od', 'bd', 'tds', 'qds', 'ow'];

  public toDispense = '';
  public errMessage = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initDosageForm();
  }

  get getFormControls() {
    return this.dosageForm.get('dosages') as FormArray;
  }

  public addRow() {
    this.toDispense = '';
    this.errMessage = '';
    this.getFormControls.push(this.initFormRow());
  }

  public doseChanged(event, group): void {
    if (event.value === 'ow') {
      group.controls.numDaysPerWeek.disable();
      group.controls.numDaysPerWeek.setValue(1);
    } else {
      group.controls.numDaysPerWeek.enable();
    }
  }

  private initDosageForm() {
    this.dosageForm = this.fb.group({
      dosages: this.fb.array([this.initFormRow()], [Validators.required]),
      dosageUnit: new FormControl(null, [Validators.required]),
    });
  }

  private initFormRow(): FormGroup {
    return this.fb.group({
      id: this.makeid(),
      dosageToTake: new FormControl(null, [Validators.required]),
      // dosageUnit: new FormControl(null, [Validators.required]),
      frequencyType: new FormControl('od', [Validators.required]),
      numDaysPerWeek: new FormControl(1, [Validators.required]),
      numWeeksPerYear: new FormControl(1, [Validators.required]),
    });
  }

  public revert(): void {
    this.toDispense = '';
    this.errMessage = '';
    this.initDosageForm();
  }

  onSubmit() {
    this.errMessage = '';
    this.toDispense = '';
    const rowBreakdown = this.calculateBreakdown();
    this.resetRowValidation();

    if (this.hasInvalidRows(rowBreakdown)) {
      this.highlightInvalidRows(rowBreakdown);
      this.errMessage =
        'Cannot calculate a dispensable dosage based on the current inputs. Fixed the affected rows and try again.';
      return;
    }

    const totalDosageBreakdown = rowBreakdown.reduce((pre, curr) => {
      for (var key in curr) {
        if (pre[key]) {
          pre[key] += curr[key];
        } else {
          pre[key] = curr[key];
        }
      }
      return pre;
    }, {});

    for (var key in totalDosageBreakdown) {
      this.toDispense += `${totalDosageBreakdown[key]} x ${key}mg \n\n`;
    }
  }

  private hasInvalidRows(rows: { [key: string]: number }[]): boolean {
    return rows.some((row) => row === null);
  }

  private highlightInvalidRows(rows: { [key: string]: number }[]): void {
    return rows.forEach((row, i) => {
      if (row === null) {
        this.getFormControls.controls[i].setErrors({ incorrect: true });
      }
    });
  }

  private resetRowValidation(): void {
    return this.getFormControls.controls.forEach((c) => c.setErrors(null));
  }

  public calculateBreakdown(): { [key: string]: number }[] {
    this.toDispense = '';
    const dosageUnit = this.dosageForm.get('dosageUnit');
    return this.dosageForm.getRawValue().dosages.map((dosage) => {
      const {
        dosageToTake,
        // dosageUnit,
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

  public calculate(): number {
    return this.dosageForm
      .getRawValue()
      .dosages.reduce((accumulator, currentValue) => {
        const {
          dosageToTake,
          dosageUnit,
          frequencyType,
          numDaysPerWeek,
          numWeeksPerYear,
        } = currentValue;

        const rowDosage =
          (dosageToTake / dosageUnit) *
          this.calculateFrequencyPerWeek(frequencyType, numDaysPerWeek) *
          numWeeksPerYear;

        return accumulator + rowDosage;
      }, 0);
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

  public deleteRow(index: number) {
    this.toDispense = '';
    this.errMessage = '';
    this.getFormControls.removeAt(index);
  }

  private makeid() {
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

  public getOptimum(coins: number[]): (amount: number) => number[] {
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
}
