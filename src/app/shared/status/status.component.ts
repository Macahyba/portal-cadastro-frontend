import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

    if (this.injectedStatus$) this.injectedStatus$.subscribe(sts => {
      this.statusForm.controls.id.setValue(sts.id);
      this.status.setValue(sts.status);
    })

    if (this.disabled) {
      this.status.disable();
      this.parentFormGroup.removeControl('status');
    }

    this._ref.detectChanges();
  }

}
