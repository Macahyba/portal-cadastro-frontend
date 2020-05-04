import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private _router: Router,
    private _auth: AuthenticationService,
    private _stor: StorageService) { }

  ngOnInit() {
    sessionStorage.clear();
    this._stor.storageSub.next(this._auth.getRole());
    this._router.navigateByUrl('/login');
  }

}
