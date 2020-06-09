// IMPORT
import { Component, OnInit, Input } from '@angular/core';

// IMPORT SERVICES
import { AuthService } from '../../services/auth/auth.service';
import { NewsService } from '../../services/news-api/news-api.service';
import { ObservablesService } from '../../services/observable/observable.service';

@Component({
  selector: 'app-connected',
  templateUrl: './connected.component.html',
  styleUrls: ['./connected.component.scss']
})

export class ConnectedComponent implements OnInit {

  public userData: any;
  public newsCollection: any;
  public newsList: any;

  @Input() currentSource: any;

  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    private AuthService: AuthService,
    // tslint:disable-next-line: no-shadowed-variable
    private NewsService: NewsService,
    // tslint:disable-next-line: no-shadowed-variable
    private ObservablesService: ObservablesService
  ) {
    this.ObservablesService.getObservableData('news').subscribe( newsListObserver => {
      if ( newsListObserver === null) { this.newsList = null; } else { this.newsList = newsListObserver.data.articles; }
    });

    this.ObservablesService.getObservableData('users').subscribe( userDataObserver => {
      if (userDataObserver === null) { this.userData = null; } else { this.userData = userDataObserver; }
    });
  }

// METHODS

  public getNewsList = async () => {
    this.newsCollection = this.NewsService.getSources;
  }

  public handleSource( event: any ) {
    this.ObservablesService.getObservableData('sources').subscribe( sourceListObserver => {
      if ( sourceListObserver === null) {
        this.currentSource = null;
      } else {
        sourceListObserver.forEach((element: { id: any; }) => {
          if (element.id === event) {
            this.currentSource = element;
          }
        });
      }
    });
  }

  public getSource( sourceId: any ) {
    this.ObservablesService.getObservableData('sources').subscribe( sourceListObserver => {
      if ( sourceListObserver === null) {
        this.currentSource = null;
      } else {
        sourceListObserver.forEach((element: { id: any; }) => {
          if (element.id === sourceId) {
            this.currentSource = element;
          }
        });
      }
    });
  }

  ngOnInit() {
    this.getNewsList();

    if (localStorage.getItem('last-search') !== undefined) {
      this.getSource(localStorage.getItem('last-search'));
    }
  }
}
