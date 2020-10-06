import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from '../service/storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;

  role: string;

  constructor(private _stor: StorageService) { }

  ngOnInit() {
    this.role = sessionStorage.getItem('role');
    this._subscription = this._stor.storageSub.subscribe(data =>this.role = data)
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
