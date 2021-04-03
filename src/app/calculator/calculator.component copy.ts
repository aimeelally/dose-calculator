// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
// import { PersonalData, DosageForm } from './calculator.model';

// @Component({
//   selector: 'app-calculator',
//   templateUrl: './calculator.component.html',
//   styleUrls: ['./calculator.component.scss'],
// })
// export class CalculatorComponent implements OnInit {
//   dosageForm: FormGroup;

//   // countries = ['USA', 'Germany', 'Italy', 'France'];

//   frequencyTypes = ['od', 'bd', 'tds', 'qds', 'ow'];

//   public toDispense: string = '';

//   constructor() {
//     this.dosageForm = this.createFormGroup();
//   }

//   ngOnInit() {}

//   // Step 1
//   private createFormGroup() {
//     return new FormGroup({
//       // personalData: new FormGroup({
//       //   email: new FormControl(),
//       //   mobile: new FormControl(),
//       //   country: new FormControl(),
//       // }),
//       dosageToTake: new FormControl(),
//       dosageUnit: new FormControl(),
//       frequencyType: new FormControl(),
//       numDaysPerWeek: new FormControl(),
//       numWeeksPerYear: new FormControl(),
//       // text: new FormControl(),
//     });
//   }

//   public revert() {
//     // Resets to blank object
//     this.dosageForm.reset();

//     // Resets to provided model
//     this.dosageForm.reset({
//       // personalData: new PersonalData(),
//       dosageToTake: 0,
//       dosageUnit: 0,
//       frequencyType: '',
//       numDaysPerWeek: 1,
//       numWeeksPerYear: 1,
//     });
//   }

//   onSubmit() {
//     this.toDispense = `Pharmacist should dispense ${this.calculate()} tablets`;

//     // Make sure to create a deep copy of the form-model
//     const result: DosageForm = Object.assign({}, this.dosageForm.value);
//     // result.personalData = Object.assign({}, result.personalData);

//     // Do useful stuff with the gathered data
//     console.log(result);
//   }

//   private calculate(): number {
//     console.log(this.dosageForm.value);
//     const {
//       dosageToTake,
//       dosageUnit,
//       frequencyType,
//       numDaysPerWeek,
//       numWeeksPerYear,
//     } = this.dosageForm.value;

//     return (dosageToTake / dosageUnit) * numDaysPerWeek * numWeeksPerYear;
//   }
// }
