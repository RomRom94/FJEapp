// IMPORT
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class ObservablesService {

  constructor() {}

  protected userInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  protected sourceList: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  protected newsList: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  protected bookmarksList: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public setObservableData = (type: string, data: any) => {
    switch (type) {
      case 'users':
        this.userInfo.next(data.user);
        this.bookmarksList.next(data.bookmark);
        break;

      case 'sources':
        this.sourceList.next(data.sources);
        break;

      case 'news':
        this.newsList.next(data);
        break;

      case 'login':
        this.userInfo.next(data.user);
        break;

      case 'logout':
        this.userInfo.next(data);
        break;

      default:
        break;
    }
  }

  public getObservableData = (type: string) => {
    switch (type) {
      case 'users':
        return this.userInfo;

      case 'sources':
          return this.sourceList;

      case 'news':
        return this.newsList;

      case 'bookmarks':
        return this.bookmarksList;

      default:
      break;
    }
  }
}
