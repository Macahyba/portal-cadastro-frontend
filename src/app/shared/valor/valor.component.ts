import { Component, OnInit, Input } from '@angular/core';
import { ServiceModel } from 'src/app/model/service.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-valor',
  templateUrl: './valor.component.html',
  styleUrls: ['./valor.component.scss']
})
export class ValorComponent implements OnInit {

  @Input() totalPrice: number = 0;
  desconto = new FormControl();

  constructor() { }

  ngOnInit() {
  }

  returnTotal(){

    return this.totalPrice*(1-this.desconto.value/100);
  
  }

}
