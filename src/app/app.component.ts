// IMPORT
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// IMPORT SERVICES
import { AuthService } from './services/auth/auth.service';
import { ObservablesService } from './services/observable/observable.service';
import { NewsService } from './services/news-api/news-api.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `
})

export class AppComponent implements OnInit {

  constructor( private AuthService: AuthService, private ObservablesService: ObservablesService, private NewsService: NewsService, private Router: Router ) {}

  async ngOnInit() {
    this.NewsService.getSources();

    if (localStorage.getItem('local-token') != null) {
      this.AuthService.userData({ token: localStorage.getItem('local-token') })
      .then( apiResponse => {
        this.ObservablesService.setObservableData('users', apiResponse.data);
        this.Router.navigateByUrl('/connected');
      })
      .catch( error => console.log('Auto connection fail', error));
    }
  }
}
