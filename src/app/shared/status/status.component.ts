import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StatusModel } from 'src/app/model/status.model';
import { StatusService } from 'src/app/service/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, OnChanges {

  @Input() injectedStatus : StatusModel;
  @Input() parentFormGroup : FormGroup;
  @Input() disabled : string;

  status = new FormControl('');

  statuses : StatusModel[];

  statusGroup : FormGroup;

  select = new FormControl('', Validators.required);

  get statusForm() : FormGroup {
    return this.parentFormGroup.controls.status as FormGroup;
  }

  constructor(private _http: StatusService, private _ref: ChangeDetectorRef) {
    this._http.getStatus().subscribe(data =>{
      this.statuses = <StatusModel[]>data;
    })

   }

  ngOnInit() {

    this.statusGroup = new FormGroup({
      id : this.select
    })
    this.parentFormGroup.registerControl('status', this.statusGroup);
    this._ref.detectChanges();
  }


  ngOnChanges(){
    setTimeout(() => {
      if (this.injectedStatus){
        this.statusForm.controls.id.setValue(this.injectedStatus.id);
        this.status.setValue(this.injectedStatus.status);
      }

      if (this.disabled){
        this.status.disable();
      }
    }, 1);
  }

}
