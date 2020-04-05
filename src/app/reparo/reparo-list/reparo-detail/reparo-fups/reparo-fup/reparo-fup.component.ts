import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { RepairFupModel } from 'src/app/model/repair-fup.model';
import { UserModel } from 'src/app/model/user.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { SparePartModel } from 'src/app/model/spare-part.model';

@Component({
  selector: 'app-reparo-fup',
  templateUrl: './reparo-fup.component.html',
  styleUrls: ['./reparo-fup.component.scss']
})
export class ReparoFupComponent implements OnInit, OnChanges {

  @Input() parentFormArray : FormArray;
  @Input() repairFup: RepairFupModel;
  @Input() disabled: string;

  repairFupFormGroup: FormGroup;

  id = this._fb.control('');
  description = this._fb.control('');

  username = this._fb.control('');

  get spareParts(){
    return this.repairFupFormGroup.controls.spareParts as FormArray;
  }

  creationDate = this._fb.control('');
  user = this._fb.control(new UserModel(this._auth.getId()));

  constructor(private _fb: FormBuilder, private _auth: AuthenticationService) { }

  ngOnInit() {
    this.repairFupFormGroup =  this._fb.group({
      id: this.id,
      description : this.description,
      spareParts : this._fb.array([]),
      user : this.user
    })
    if (!this.repairFup) this.parentFormArray.push(this.repairFupFormGroup);
  }

  ngOnChanges(){

    setTimeout(() => {

      if (this.repairFup){
        this.id.setValue(this.repairFup.id);
        this.description.setValue(this.repairFup.description);
        this.username.setValue(this.repairFup.user.fullName);

        for (let index = 0; index < this.repairFup.spareParts.length; index++) {
          this.spareParts.push(
            this._fb.group({
              id: this.repairFup.spareParts[index].id,
              partNumber: this.repairFup.spareParts[index].partNumber
            })
          )
        }

        this.creationDate.setValue(this.repairFup.updateDate);
        this.user.setValue(this.repairFup.user);

      }

      if(this.disabled){
        this.description.disable();
        this.spareParts.disable();
        this.username.disable();
      }
    }, 0);
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
