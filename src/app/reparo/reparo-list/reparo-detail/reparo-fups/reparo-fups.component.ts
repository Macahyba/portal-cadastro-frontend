import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RepairFupModel } from 'src/app/model/repair-fup.model';

@Component({
  selector: 'app-reparo-fups',
  templateUrl: './reparo-fups.component.html',
  styleUrls: ['./reparo-fups.component.scss']
})
export class ReparoFupsComponent implements OnInit {

  @Input() repairFupsFormGroup : FormGroup;
  @Input() repairFups : RepairFupModel[];

  constructor() { }

  ngOnInit() {
  }

}
