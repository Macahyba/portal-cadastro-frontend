import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { RepairFupModel } from 'src/app/model/repair-fup.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-reparo-fups',
  templateUrl: './reparo-fups.component.html',
  styleUrls: ['./reparo-fups.component.scss']
})
export class ReparoFupsComponent implements OnInit {

  @Input() parentFormGroup : FormGroup;
  @Input() repairFups$ : BehaviorSubject<RepairFupModel[]>;

  repairFupFormArray: FormArray;
  reverseRepairFups;

  showNewFup: boolean;

  creationDate$ = new BehaviorSubject<Date>(new Date());

  step = null;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.repairFupFormArray = this._fb.array([]);
    this.parentFormGroup.registerControl('repairFups', this.repairFupFormArray);

    this.repairFups$.subscribe(rfs =>{
      this.reverseRepairFups = rfs.sort(this.compare);
    })
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
