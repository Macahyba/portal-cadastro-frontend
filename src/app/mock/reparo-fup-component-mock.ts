import { Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { RepairFupModel } from '../model/repair-fup.model';

@Component({
  selector: 'app-reparo-fup',
  template: ''
})
export class ReparoFupComponentMock {

  @Input() parentFormArray : FormArray;
  @Input() injectedRepairFup: RepairFupModel;
  @Input() disabled: boolean;
}
