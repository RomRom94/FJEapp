// IMPORT
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// IMPORT SERVICES
import { ObservablesService } from '../observable/observable.service';
import { AuthService } from '../auth/auth.service';
//

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  // tslint:disable-next-line: no-shadowed-variable
  constructor( private ObservablesService: ObservablesService, private AuthService: AuthService, private HttpClient: HttpClient ) {}

  private setHeaderRequest = () => {
    const myHeader = new HttpHeaders();
    myHeader.append('Content-Type', 'application/json');
    return { headers: myHeader };
  }

// METHODS

  public getSources(): Promise<any> {
    return this.HttpClient.get(`${environment.NEWS_API_URL}/sources?apiKey=${environment.API_KEY}`)
    .toPromise()
    .then( data => this.getData('sources', data))
    .catch(this.handleError);
  }

  public getNewsBySource( source: string, keyword: string = null ): Promise<any> {
    // tslint:disable-next-line: max-line-length
    return this.HttpClient.post(`${environment.API_URL}/news/${source}/${keyword}`, { news_api_token: environment.API_KEY }, this.setHeaderRequest())
    .toPromise()
    .then( data => this.getData('news', data))
    .catch(this.handleError);
  }

  public addBookmark( data: any ): Promise<any> {
    return this.HttpClient.post(`${environment.API_URL}/bookmark`, data, this.setHeaderRequest())
    .toPromise()
    // tslint:disable-next-line: no-shadowed-variable
    .then( data => this.getData('bookmarks', data))
    .catch(this.handleError);
  }

  public deleteBookmark( id: any, data: any ): Promise<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data,
    };
    return this.HttpClient.delete(`${environment.API_URL}/bookmark/${id}`, options)
    .toPromise()
    // tslint:disable-next-line: no-shadowed-variable
    .then( data => this.getData('bookmarks', data))
    .catch(this.handleError);
  }

  private getData = (endpoint: string, apiResponse: any): Observable<any> => {
    switch (endpoint) {
      case 'sources':
        this.ObservablesService.setObservableData('sources', apiResponse);
        break;

      case 'news':
        this.ObservablesService.setObservableData('news', apiResponse);
        break;

      case 'bookmarks':
        this.AuthService.userData({ token: localStorage.getItem('local-token') });
        break;

      default:
        break;
    }
    return apiResponse || {};
  }

  private handleError = (apiError: any) => Promise.reject(apiError);
}
