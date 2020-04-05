import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { RepairFupModel } from 'src/app/model/repair-fup.model';

@Component({
  selector: 'app-reparo-fups',
  templateUrl: './reparo-fups.component.html',
  styleUrls: ['./reparo-fups.component.scss']
})
export class ReparoFupsComponent implements OnInit {

  @Input() parentFormGroup : FormGroup;
  @Input() repairFups : RepairFupModel[];
  @Input() disabled: string;

  repairFupFormArray: FormArray;
  reverseRepairFups : RepairFupModel[];

  showNewFup: boolean;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.repairFupFormArray = this._fb.array([]);
    this.parentFormGroup.registerControl('repairFups', this.repairFupFormArray);
    setTimeout(() => {
      if (this.repairFups) this.reverseRepairFups = this.repairFups.sort(this.compare);
    }, 1000);
  }

  compare(a, b){
    if ( a.updateDate > b.updateDate ){
      return -1;
    }
    if ( a.updateDate < b.updateDate ){
      return 1;
    }
    return 0;
  }

  toggleNewFup(event){
    this.showNewFup = event.checked;
    if (!event.checked) this.repairFupFormArray.clear();
  }

}
