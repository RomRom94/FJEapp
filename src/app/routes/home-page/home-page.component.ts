// IMPORT
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// IMPORT SERVICES
import { AuthService } from '../../services/auth/auth.service';
import { ObservablesService } from '../../services/observable/observable.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  public userConnected = false;
  public newsList: any;

  @Input() currentSource: any;

  // tslint:disable-next-line: no-shadowed-variable
  constructor( private AuthService: AuthService, private ObservablesService: ObservablesService, private Router: Router ) {
    this.ObservablesService.getObservableData('news').subscribe( newsListObserver => {
      // Check value
      if ( newsListObserver === null) { this.newsList = null; } else { this.newsList = newsListObserver.data.articles; }
    });
  }

  // METHODS

  public login = ( data: any ) => {
    this.AuthService.login({ email: data.email, password: data.password })
    .then( userLogin => {
      localStorage.setItem('local-token', userLogin.data.token);
      this.userConnected = true;
      this.Router.navigateByUrl('/connected');
    })
    .catch( error => {
      console.log('ERROR request', error);
    });
  }

  public getUserData = ( token: string ) => {
    this.AuthService.userData({ token })
    .then( userData => {
      this.userConnected = true;
      this.Router.navigateByUrl('/connected');
    })
    .catch( error => {
      console.log('ERROR request', error);
    });
  }

  public register( data: any ) {
    this.AuthService.register({ email: data.email, password: data.password, firstname: data.firstname, lastname: data.lastname }).
    then( register => {
      this.login({email: register.data.identity.email, password: data.password});
    })
    .catch( error => {
      console.log('ERROR request', error);
    });
  }

  public getSource( sourceId: any ) {
    this.ObservablesService.getObservableData('sources').subscribe( sourceListObserver => {
      if ( sourceListObserver === null) { this.currentSource = null; } else {
        sourceListObserver.forEach((element: { id: any; }) => {
          if (element.id === sourceId) {
            this.currentSource = element;
          }
        });
      }
    });
  }

  public handleSource( event: any ) {
    this.ObservablesService.getObservableData('sources').subscribe( sourceListObserver => {
      if ( sourceListObserver === null) { this.currentSource = null; } else {
        sourceListObserver.forEach((element: { id: any; }) => {
          if (element.id === event) {
            this.currentSource = element;
          }
        });
      }
    });
  }

  ngOnInit() {
    if (localStorage.getItem('local-token') !== undefined) {
      this.getUserData(localStorage.getItem('local-token'));
    } else {
      this.userConnected = false;
    }

    if (localStorage.getItem('last-search') !== undefined) {
      this.getSource(localStorage.getItem('last-search'));
    }
  }
}
