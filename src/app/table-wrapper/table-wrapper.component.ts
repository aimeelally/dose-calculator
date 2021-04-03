import { DataSource } from '@angular/cdk/collections';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewChild,
  ContentChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatColumnDef,
  MatFooterRowDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { DosageForm } from '../calculator/calculator.model';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss'],
})
export class TableWrapperComponent<T> implements AfterContentInit {
  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatFooterRowDef) footerRowDefs: QueryList<MatFooterRowDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<T>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;

  @ViewChild(MatTable, { static: true }) table: MatTable<T>;

  @Input() columns: string[];

  @Input() dataSource: DataSource<T>;

  dosageForm: FormGroup;

  constructor() {
    this.dosageForm = this.createFormGroup();
  }

  ngAfterContentInit() {
    this.columnDefs.forEach((columnDef) => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach((rowDef) => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach((headerRowDef) =>
      this.table.addHeaderRowDef(headerRowDef)
    );
    this.footerRowDefs.forEach((footerRowDef) =>
      this.table.addFooterRowDef(footerRowDef)
    );
    this.table.setNoDataRow(this.noDataRow);

    this.dosageForm
      .get('frequencyType')
      .valueChanges.subscribe((frequency: string) => {
        if (frequency === 'ow') {
          this.dosageForm.controls.numDaysPerWeek.disable();
          this.dosageForm.controls.numDaysPerWeek.setValue(1);
        } else {
          this.dosageForm.controls.numDaysPerWeek.enable();
        }
      });
  }

  //////////////////////////

  frequencyTypes = ['od', 'bd', 'tds', 'qds', 'ow'];

  public toDispense: string = '';

  private createFormGroup() {
    return new FormGroup({
      dosageToTake: new FormControl(null, [Validators.required]),
      dosageUnit: new FormControl(null, [Validators.required]),
      frequencyType: new FormControl('od', [Validators.required]),
      numDaysPerWeek: new FormControl(1, [Validators.required]),
      numWeeksPerYear: new FormControl(1, [Validators.required]),
    });
  }

  public revert() {
    // Resets to blank object
    this.dosageForm.reset({
      dosageToTake: null,
      dosageUnit: null,
      frequencyType: 'od',
      numDaysPerWeek: 1,
      numWeeksPerYear: 1,
    });
  }

  onSubmit() {
    const numTablets = +this.calculate().toFixed(2);
    this.toDispense = `Pharmacist should dispense ${numTablets} tablets`;

    // Make sure to create a deep copy of the form-model
    const result: DosageForm = Object.assign({}, this.dosageForm.value);
    // result.personalData = Object.assign({}, result.personalData);

    // Do useful stuff with the gathered data
    console.log(result);
  }

  public calculate(): number {
    console.log(this.dosageForm.value);
    const {
      dosageToTake,
      dosageUnit,
      frequencyType,
      numDaysPerWeek,
      numWeeksPerYear,
    } = this.dosageForm.getRawValue();

    return (
      (dosageToTake / dosageUnit) *
      this.calculateFrequencyPerWeek(frequencyType, numDaysPerWeek) *
      numWeeksPerYear
    );
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
