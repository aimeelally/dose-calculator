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
  dosageForm: FormGroup;

  public frequencyTypes = ['od', 'bd', 'tds', 'qds', 'ow'];

  public toDispense: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dosageForm = this.fb.group({
      dosages: this.fb.array([]),
    });
    this.addRow();
  }

  public addRow() {
    this.toDispense = null;

    const control = this.dosageForm.get('dosages') as FormArray;
    const newDose = this.initiateForm();
    // newDose.get('frequencyType').valueChanges.subscribe((frequency: string) => {
    //   if (frequency === 'ow') {
    //     this.dosageForm.controls.numDaysPerWeek.disable();
    //     this.dosageForm.controls.numDaysPerWeek.setValue(1);
    //   } else {
    //     this.dosageForm.controls.numDaysPerWeek.enable();
    //   }
    // });
    // newDose.valueChanges.subscribe((dose: any) => {
    //   this.doseChanged(dose);
    // });
    control.push(newDose);
  }

  // private doseChanged(dose: Dosage): void {
  public doseChanged(event, group): void {
    if (event.value === 'ow') {
      group.controls.numDaysPerWeek.disable();
      group.controls.numDaysPerWeek.setValue(1);
    } else {
      group.controls.numDaysPerWeek.enable();
    }
  }

  private initiateForm(): FormGroup {
    return this.fb.group({
      id: this.makeid(),
      dosageToTake: new FormControl(null, [Validators.required]),
      dosageUnit: new FormControl(null, [Validators.required]),
      frequencyType: new FormControl('od', [Validators.required]),
      numDaysPerWeek: new FormControl(1, [Validators.required]),
      numWeeksPerYear: new FormControl(1, [Validators.required]),
    });
  }

  get getFormControls() {
    const control = this.dosageForm.get('dosages') as FormArray;
    return control;
  }

  public revert() {
    console.log('revert something');
    // Resets to blank object
    // this.dosageForm.reset({
    //   dosageToTake: null,
    //   dosageUnit: null,
    //   frequencyType: 'od',
    //   numDaysPerWeek: 1,
    //   numWeeksPerYear: 1,
    // });
  }

  onSubmit() {
    console.log(this.dosageForm.value);

    const numTablets = +this.calculate().toFixed(2);
    this.toDispense = `Pharmacist should dispense ${numTablets} tablets`;

    // Make sure to create a deep copy of the form-model
    // const result: DosageForm = Object.assign({}, this.dosageForm.value);
    // result.personalData = Object.assign({}, result.personalData);

    // Do useful stuff with the gathered data
    // console.log(result);
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

  deleteRow(index: number) {
    const control = this.dosageForm.get('dosages') as FormArray;
    control.removeAt(index);
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
}