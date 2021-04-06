// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormControl, FormGroup, Validators } from '@angular/forms';

// import { TableWrapperComponent } from './table-wrapper.component';

// describe('TableWrapperComponent', () => {
//   let component: TableWrapperComponent<any>;
//   let fixture: ComponentFixture<TableWrapperComponent<any>>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [TableWrapperComponent],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TableWrapperComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   // it('should calculate dosage', () => {
//   //   // arrange
//   //   component.dosageForm = new FormGroup({
//   //     dosageToTake: new FormControl(200, [Validators.required]),
//   //     dosageUnit: new FormControl(20, [Validators.required]),
//   //     frequencyType: new FormControl('od', [Validators.required]),
//   //     numDaysPerWeek: new FormControl(3, [Validators.required]),
//   //     numWeeksPerYear: new FormControl(1, [Validators.required]),
//   //   });

//   //   // act
//   //   const result = component.calculate();

//   //   console.log('AAAAAA', result);

//   //   // assert
//   //   expect(result).toEqual(3);
//   // });

//   it('should calculate dosage when ow', () => {
//     // arrange
//     component.dosageForm = new FormGroup({
//       dosageToTake: new FormControl(344, [Validators.required]),
//       dosageUnit: new FormControl(44, [Validators.required]),
//       frequencyType: new FormControl('ow', [Validators.required]),
//       numDaysPerWeek: new FormControl(1, [Validators.required]),
//       numWeeksPerYear: new FormControl(1, [Validators.required]),
//     });

//     // act
//     const result = component.calculate();

//     console.log('AAAAAA', result);

//     // assert
//     expect(result).toEqual(3);
//   });
// });
