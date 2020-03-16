import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuotationService } from 'src/app/service/quotation.service';
import { StatusModel } from 'src/app/model/status.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, AfterViewInit {

  @Input() injectedStatus : StatusModel;
  @Input() statusFormGroup : FormGroup;
  statuses : StatusModel[];

  statusGroup : FormGroup;

  select = new FormControl('', Validators.required);

  get statusForm() : FormGroup {
    return this.statusFormGroup.controls.status as FormGroup;
  }

  constructor(private _http: QuotationService, private _ref: ChangeDetectorRef) {
    this._http.getStatus().subscribe(data =>{
      this.statuses = <StatusModel[]>data;
    })

   }

  ngOnInit() {

    this.statusGroup = new FormGroup({
      id : this.select
    })
    this.statusFormGroup.registerControl('status', this.statusGroup);
    this._ref.detectChanges();
  }


  ngAfterViewInit(){
    setTimeout(() => {
      if (this.injectedStatus){
        this.statusForm.controls.id.setValue(this.injectedStatus.id);
      }
    }, 1);
  }

}
