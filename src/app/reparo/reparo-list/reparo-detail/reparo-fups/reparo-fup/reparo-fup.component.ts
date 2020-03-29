import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RepairFupModel } from 'src/app/model/repair-fup.model';
import { UserModel } from 'src/app/model/user.model';

@Component({
  selector: 'app-reparo-fup',
  templateUrl: './reparo-fup.component.html',
  styleUrls: ['./reparo-fup.component.scss']
})
export class ReparoFupComponent implements OnInit, AfterViewInit {

  @Input() repairFupFormGroup : FormGroup;
  @Input() repairFup: RepairFupModel;
  @Input() control: string;
  user : UserModel = new UserModel(1);


  description = new FormControl('');
  sparePart = new FormControl('');

  constructor() { }

  ngOnInit() {
    this.repairFupFormGroup =  new FormGroup({
      'description' : this.description,
      'sparePart' : this.sparePart,
      'user' : new FormControl(this.user)
    })
  }

  ngAfterViewInit(){

    if (this.repairFup){
      this.repairFupFormGroup.controls.description.setValue(this.repairFup.description);
      this.repairFupFormGroup.controls.sparePart.setValue(this.repairFup.spareParts); // É UM ARRAY
    }

  }

}
