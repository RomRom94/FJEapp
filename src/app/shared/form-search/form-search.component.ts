// IMPORT
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// IMPORT SERVICES
import { ObservablesService } from '../../services/observable/observable.service';
import { NewsService } from '../../services/news-api/news-api.service';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss']
})

export class FormSearchComponent implements OnInit {

  public formData: FormGroup;

  public bookmarksList: any;
  public sourcesList: any;

  public isBookmarked = false;

  public userInfo: any;
  public currentSourceId: any;

  @Output() formSubmit = new EventEmitter();
  @Output() source = new EventEmitter();

  // tslint:disable-next-line: no-shadowed-variable
  constructor( private ObservablesService: ObservablesService, private NewsService: NewsService, private FormBuilder: FormBuilder ) {
    this.ObservablesService.getObservableData('sources').subscribe( sourceListObserver => {
      if ( sourceListObserver === null) { this.sourcesList = null; } else { this.sourcesList = sourceListObserver; }
    });

    this.ObservablesService.getObservableData('users').subscribe( userInfoObserver => {
      if ( userInfoObserver === null) { this.userInfo = null; } else { this.userInfo = userInfoObserver; }
    });

    this.ObservablesService.getObservableData('bookmarks').subscribe( bookmarksListObserver => {
      if ( bookmarksListObserver === null) { this.bookmarksList = null; } else { this.bookmarksList = bookmarksListObserver; }
    });
  }

// METHODS

  public resetForm = () => {
    this.formData = this.FormBuilder.group({
      source: [ null ],
      keyword: [ null ]
    });

    this.currentSourceId = null;
  }

  public getNews = (data: any) => {
    localStorage.setItem('last-search', data.value.source);
    this.currentSourceId = data.value.source;
    this.NewsService.getNewsBySource(data.value.source, data.value.keyword);
    this.source.emit(data.value.source);
  }

  public onChangeSource(event: { target: { value: any; }; }) {
    this.isBookmarked = false;
    this.currentSourceId = event.target.value;

    if (this.bookmarksList != null) {
      this.bookmarksList.forEach((element: { id: any; }) => {
        if (element.id === this.currentSourceId) {
          this.isBookmarked = true;
        }
      });
    }
  }

  public addBookmark() {
    this.sourcesList.forEach((element) => {
      if (element.id === this.currentSourceId) {
        const data = element;
        data.token = localStorage.getItem('local-token');
        this.NewsService.addBookmark(data);
      }
    });
    this.isBookmarked = true;
  }

  public deleteBookmark() {
    let bookmarkId: any;

    this.bookmarksList.forEach((element: { id: any; _id: any; }) => {
      if (element.id === this.currentSourceId) {
        bookmarkId = element._id;
      }
    });

    this.NewsService.deleteBookmark(bookmarkId, { token: localStorage.getItem('local-token') });
    this.isBookmarked = false;
  }

  ngOnInit() {
    this.resetForm();
    if (localStorage.getItem('last-search') != null) {
      this.NewsService.getNewsBySource(localStorage.getItem('last-search'));
      this.currentSourceId = localStorage.getItem('last-search');
    }
  }
}
