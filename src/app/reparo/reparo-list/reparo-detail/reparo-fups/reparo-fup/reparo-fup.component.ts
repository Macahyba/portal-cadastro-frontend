import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { RepairFupModel } from 'src/app/model/repair-fup.model';
import { UserModel } from 'src/app/model/user.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-reparo-fup',
  templateUrl: './reparo-fup.component.html',
  styleUrls: ['./reparo-fup.component.scss']
})
export class ReparoFupComponent implements OnInit {

  @Input() parentFormArray : FormArray;
  @Input() injectedRepairFup: RepairFupModel;
  @Input() disabled: boolean;

  repairFupFormGroup: FormGroup;

  id = this._fb.control('');
  description = this._fb.control('');

  username = this._fb.control('');

  get spareParts(){
    return this.repairFupFormGroup.controls.spareParts as FormArray;
  }

  creationDate = new BehaviorSubject<Date>(new Date());
  user = this._fb.control(new UserModel(this._auth.getId()));

  constructor(private _fb: FormBuilder, private _auth: AuthenticationService) { }

  ngOnInit() {

    this.repairFupFormGroup = this._fb.group({
      id: this.id,
      description : this.description,
      spareParts : this._fb.array([]),
      user : this.user
    })

    if (!this.injectedRepairFup) this.parentFormArray.push(this.repairFupFormGroup);

    if (this.injectedRepairFup){

        this.id.setValue(this.injectedRepairFup.id)
        this.description.setValue(this.injectedRepairFup.description);
        this.username.setValue(this.injectedRepairFup.user.fullName);

        for (let index = 0; index < this.injectedRepairFup.spareParts.length; index++) {
          this.spareParts.push(
            this._fb.group({
              id: this.injectedRepairFup.spareParts[index].id,
              partNumber: this.injectedRepairFup.spareParts[index].partNumber
            })
          )
        }
        this.creationDate.next(this.injectedRepairFup.updateDate);
        this.user.setValue(this.injectedRepairFup.user);
    }

    if(this.disabled){
      this.description.disable();
      this.spareParts.disable();
      this.username.disable();
      this.parentFormArray.removeAt(this.parentFormArray.length-1)
    }

  }

  createPart(){
    return this._fb.group({
      id: '',
      partNumber: ''
    });
  }

  addPart(){
    this.spareParts.push(this.createPart());
  }

  removePart(){
    this.spareParts.removeAt(this.spareParts.length - 1);
  }

}
