// IMPORT
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// IMPORT SERVICES
import { ObservablesService } from '../../services/observable/observable.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  public userData: any;
  public userBookmarks: any;

  // tslint:disable-next-line: no-shadowed-variable
  constructor( private ObservablesService: ObservablesService, private Router: Router
  ) {
    this.ObservablesService.getObservableData('users').subscribe( userDataObserver => {
      if (userDataObserver === null) { this.userData = null; } else { this.userData = userDataObserver; }
    });
  }

// METHODS

  public logout() {
    localStorage.removeItem('local-token');
    this.ObservablesService.setObservableData('logout', null);
    this.Router.navigateByUrl('/');
  }

  ngOnInit() {}
}
