import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StatusModel } from 'src/app/model/status.model';
import { StatusService } from 'src/app/service/status.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  @Input() injectedStatus$ : Observable<StatusModel>;
  @Input() parentFormGroup : FormGroup;
  @Input() disabled : boolean;

  status = this._fb.control('')

  statuses : StatusModel[];

  statusGroup : FormGroup;

  select = this._fb.control('', Validators.required);

  constructor(private _http: StatusService, private _fb: FormBuilder) {
    this._http.getStatus().subscribe(data =>{
      this.statuses = <StatusModel[]>data;
    })

   }

  ngOnInit() {
    this.statusGroup = this._fb.group({
      id : this.select
    })
    this.parentFormGroup.registerControl('status', this.statusGroup);

    if (this.injectedStatus$) this.injectedStatus$.subscribe(sts => {
      this.status.setValue(sts.status);
      this.statusGroup.patchValue(sts);
    })

    if (this.disabled) {
      this.status.disable();
      this.statusGroup.controls.id.disable();
      this.parentFormGroup.removeControl('status');
    }
  }
}
