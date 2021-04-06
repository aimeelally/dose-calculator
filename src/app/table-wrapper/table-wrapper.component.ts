// import { AfterContentInit, Component, OnInit } from '@angular/core';
// import {
//   FormArray,
//   FormBuilder,
//   FormControl,
//   FormGroup,
//   Validators,
// } from '@angular/forms';

// @Component({
//   selector: 'app-table-wrapper',
//   templateUrl: './table-wrapper.component.html',
//   styleUrls: ['./table-wrapper.component.scss'],
// })
// export class TableWrapperComponent implements OnInit {
//   dosageForm: FormGroup;

//   constructor(private fb: FormBuilder) {}

//   ngOnInit() {
//     this.dosageForm = this.fb.group({
//       dosages: this.fb.array([]),
//     });
//     this.addRow();
//   }

//   private addRow() {
//     const control = this.dosageForm.get('dosages') as FormArray;
//     control.push(this.initiateForm());
//   }

//   private initiateForm(): FormGroup {
//     return this.fb.group({
//       dosageToTake: new FormControl(null, [Validators.required]),
//       dosageUnit: new FormControl(null, [Validators.required]),
//       frequencyType: new FormControl('od', [Validators.required]),
//       numDaysPerWeek: new FormControl(1, [Validators.required]),
//       numWeeksPerYear: new FormControl(1, [Validators.required]),
//     });
//   }

//   get getFormControls() {
//     const control = this.dosageForm.get('dosages') as FormArray;
//     return control;
//   }

//   //////////////////////////

//   frequencyTypes = ['od', 'bd', 'tds', 'qds', 'ow'];

//   public toDispense: string = '';

//   private createFormGroup(): FormGroup {
//     return this.fb.group({
//       dosageToTake: new FormControl(null, [Validators.required]),
//       dosageUnit: new FormControl(null, [Validators.required]),
//       frequencyType: new FormControl('od', [Validators.required]),
//       numDaysPerWeek: new FormControl(1, [Validators.required]),
//       numWeeksPerYear: new FormControl(1, [Validators.required]),
//     });
//   }

//   public revert() {
//     console.log('revert something');
//     // Resets to blank object
//     // this.dosageForm.reset({
//     //   dosageToTake: null,
//     //   dosageUnit: null,
//     //   frequencyType: 'od',
//     //   numDaysPerWeek: 1,
//     //   numWeeksPerYear: 1,
//     // });
//   }

//   onSubmit() {
//     const numTablets = +this.calculate().toFixed(2);
//     this.toDispense = `Pharmacist should dispense ${numTablets} tablets`;

//     // Make sure to create a deep copy of the form-model
//     // const result: DosageForm = Object.assign({}, this.dosageForm.value);
//     // result.personalData = Object.assign({}, result.personalData);

//     // Do useful stuff with the gathered data
//     // console.log(result);
//   }

//   public calculate(): number {
//     return 4;
//     // debugger;
//     // console.log(this.dosageForm.value);
//     // const {
//     //   dosageToTake,
//     //   dosageUnit,
//     //   frequencyType,
//     //   numDaysPerWeek,
//     //   numWeeksPerYear,
//     // } = this.dosageForm.getRawValue();

//     // return (
//     //   (dosageToTake / dosageUnit) *
//     //   this.calculateFrequencyPerWeek(frequencyType, numDaysPerWeek) *
//     //   numWeeksPerYear
//     // );
//   }

//   private calculateFrequencyPerWeek(
//     frequencyType: string,
//     numDaysPerWeek: number
//   ): number {
//     return this.getFrequency(frequencyType) * numDaysPerWeek;
//   }

//   private getFrequency(frequencyType: string): number {
//     switch (frequencyType) {
//       case 'od':
//       case 'ow':
//         return 1;
//       case 'bd':
//         return 2;
//       case 'tds':
//         return 3;
//       case 'qds':
//         return 4;
//     }
//   }

//   public remove(index: number): void {
//     console.log(index);
//   }
// }
