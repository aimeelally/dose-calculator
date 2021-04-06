// export class ContactRequest {
//   // personalData: PersonalData;
//   dosageToTake: number = 0;
//   // frequencyType: any = '';
//   frequencyType: any = ['od', 'bd', 'tds', 'qds', 'ow'];
//   text: string = '';
// }

// export class DosageForm {
//   dosageToTake: number = 0;
//   dosageUnit: number = 0;
//   frequencyType: any = ['od', 'bd', 'tds', 'qds', 'ow'];
//   numDaysPerWeek: number = 1;
//   numWeeksPerYear: number = 1;
// }

export class Dosage {
  id: number;
  dosageToTake: number;
  dosageUnit: number;
  // frequencyType: string[] = ['od', 'bd', 'tds', 'qds', 'ow'];
  frequencyType: string;
  numDaysPerWeek: number = 1;
  numWeeksPerYear: number = 1;
}

// export class PersonalData {
//   email: string = '';
//   mobile: string = '';
//   country: string = '';
// }

// export enum Frequency {
//   OD,
//   BD,
//   TDS,
// }
