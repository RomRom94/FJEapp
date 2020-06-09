// IMPORT
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// IMPORT SERVICES
import { AuthService } from './services/auth/auth.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

  // tslint:disable-next-line: no-shadowed-variable
  constructor( private AuthService: AuthService, private Router: Router ) {}

// METHODS

  canActivate(): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.AuthService.userData({ token: localStorage.getItem('local-token')})
      .then( ( apiResponse ) => {
        if (apiResponse.err == null) { return resolve(true); } else { this.Router.navigateByUrl('/'); }
      })
      .catch( ( apiResponse ) =>  this.Router.navigateByUrl('/'));
    });
  }
}
