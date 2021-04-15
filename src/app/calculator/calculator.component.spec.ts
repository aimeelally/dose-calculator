// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatTableModule } from '@angular/material/table';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { CalculatorComponent } from './calculator.component';

// describe('CalculatorComponent', () => {
//   let component: CalculatorComponent;
//   let fixture: ComponentFixture<CalculatorComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         ReactiveFormsModule,
//         BrowserAnimationsModule,
//         MatTableModule,
//         MatButtonModule,
//         MatInputModule,
//         MatSelectModule,
//         MatToolbarModule,
//         MatCardModule,
//         MatIconModule,
//       ],
//       declarations: [CalculatorComponent],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CalculatorComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     // expect(component).toBeTruthy();
//     const test = component.getOptimum([20, 60, 80, 40, 120])(120);
//     console.log(test);
//   });

//   it('should calculate once per day with multiple units', () => {
//     component.dosageForm.setValue({
//       dosages: [
//         {
//           id: 'wer',
//           dosageToTake: 75,
//           dosageUnit: '25,50',
//           frequencyType: 'od',
//           numDaysPerWeek: 1,
//           numWeeksPerYear: 1,
//         },
//       ],
//     });
//     // expect(component).toBeTruthy();
//     const test = component.calculateBreakdown();
//     expect(test).toEqual({
//       '25': 1,
//       '50': 1,
//     });
//   });

//   it('should calculate tds 7pw 4wpy with multiple units', () => {
//     component.dosageForm.setValue({
//       dosages: [
//         {
//           id: 'wer',
//           dosageToTake: 75,
//           dosageUnit: '25,50',
//           frequencyType: 'tds',
//           numDaysPerWeek: 1,
//           numWeeksPerYear: 1,
//         },
//       ],
//     });
//     // expect(component).toBeTruthy();
//     const test = component.calculateBreakdown();
//     expect(test).toEqual({
//       '25': 3,
//       '50': 3,
//     });
//   });
// });
