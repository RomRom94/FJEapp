// IMPORT
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

// IMPORT SERVICES
import { ObservablesService } from '../observable/observable.service';

@Injectable()

export class AuthService {

  // tslint:disable-next-line: no-shadowed-variable
  constructor( private HttpClient: HttpClient, private ObservablesService: ObservablesService ) {}
    private setHeaderRequest = () => {
      const myHeader = new HttpHeaders();
      myHeader.append('Content-Type', 'application/json');
      return { headers: myHeader };
    }

// METHODS

  public register(data: any): Promise<any> {
    return this.HttpClient.post(`${environment.API_URL}/register`, data, this.setHeaderRequest())
    .toPromise()
    // tslint:disable-next-line: no-shadowed-variable
    .then( data => this.getData('register', data))
    .catch(this.handleError);
  }

  public login(data: any): Promise<any> {
    return this.HttpClient.post(`${environment.API_URL}/login`, data, this.setHeaderRequest())
    .toPromise()
    // tslint:disable-next-line: no-shadowed-variable
    .then( data => this.getData('login', data))
    .catch(this.handleError);
  }

  public userData(data: any): Promise<any> {
    return this.HttpClient.post(`${environment.API_URL}/me`, data, this.setHeaderRequest())
    .toPromise()
    // tslint:disable-next-line: no-shadowed-variable
    .then( data => this.getData('users', data))
    .catch(this.handleError);
  }

  private getData = (endpoint, apiResponse: any) => {
    switch (endpoint) {
      case 'login':
        this.ObservablesService.setObservableData('login', apiResponse.data);
        break;

      case 'users':
        this.ObservablesService.setObservableData('users', apiResponse.data);
        break;

      default:
        break;
    }
    return apiResponse || {};
  }

  private handleError = (apiError: any) => Promise.reject(apiError.error);
}
