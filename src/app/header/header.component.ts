import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  role: string;

  constructor(private _stor: StorageService) { }

  ngOnInit() {
    this.role = sessionStorage.getItem('role');
    this._stor.storageSub.subscribe(data =>this.role = data)
  }

}
