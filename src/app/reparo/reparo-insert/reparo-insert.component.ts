import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reparo-insert',
  templateUrl: './reparo-insert.component.html',
  styleUrls: ['./reparo-insert.component.scss']
})
export class ReparoInsertComponent implements OnInit {

  creationDate = new FormControl(new Date());
  sapNotification = new FormControl('');
  notaDeEntrada = new FormControl('');
  warranty = new FormControl('');

  reparoFormGroup : FormGroup;

  get customerFormGroup() {
    return this.reparoFormGroup;
  }

  get equipmentFormGroup() {
    return this.reparoFormGroup;
  }

  get dateFormGroup(){
    return this.reparoFormGroup;
  }

  constructor(private fb: FormBuilder) {
    this.reparoFormGroup = this.fb.group({
      'creationDate' : this.creationDate,
      'sapNotification' : this.sapNotification,
      'notaDeEntrada' : this.notaDeEntrada,
      'warranty' : this.warranty
    });
   }

  ngOnInit() {
  }

  submitForm() {
    console.log(this.reparoFormGroup.getRawValue());
  }

}
