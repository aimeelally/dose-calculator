import { CalculatorService } from './calculator.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DosageCalendarWeek } from '../calendar/calendar.component';

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

  public calendarDosages: any;

  constructor(
    private fb: FormBuilder,
    private readonly calculatorService: CalculatorService
  ) {}

  ngOnInit() {
    this.initDosageForm();
  }

  get getFormControls() {
    return this.dosageForm.get('dosages') as FormArray;
  }

  get dosageUnit() {
    return this.dosageForm.get('dosageUnit') as AbstractControl;
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
      id: this.calculatorService.makeUniqueId(),
      dosageToTake: new FormControl(null, [Validators.required]),
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
    this.calendarDosages = this.calculatorService.generateCalendarData(
      this.dosageForm,
      this.dosageUnit
    );
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
    return this.calculatorService.calculateBreakdown(
      this.dosageForm,
      this.dosageUnit
    );
  }

  public deleteRow(index: number) {
    this.toDispense = '';
    this.errMessage = '';
    this.getFormControls.removeAt(index);
  }
}
