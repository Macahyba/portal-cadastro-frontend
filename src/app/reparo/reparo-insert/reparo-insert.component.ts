import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reparo-insert',
  templateUrl: './reparo-insert.component.html',
  styleUrls: ['./reparo-insert.component.scss']
})
export class ReparoInsertComponent implements OnInit {

  creationDate: Date;

  reparoFormGroup = this.fb.group({
    customer: this.fb.group({
      customerName: this.fb.control(['']),
      customerFullName: this.fb.control(['']),
      customerCnpj: this.fb.control(['']),
      contactName:this.fb.control(['']),
      contactDept:this.fb.control(['']),
      contactEmail: this.fb.control(['']),
    }),
    equipment: this.fb.group({
      equipmentName: this.fb.control(''),
      equipmentSerialNumber: this.fb.control(''),
    })
  });

  get customerFormGroup() {
    return this.reparoFormGroup.controls.customer;
  }

  get equipmentFormGroup() {
    return this.reparoFormGroup.controls.equipment;
  }  
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  mariolar(e) {
    console.log(this.reparoFormGroup.getRawValue());
  }

}
