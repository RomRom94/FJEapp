// IMPORT
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

// IMPORT SERVICES
import { ObservablesService } from '../../services/observable/observable.service';
import { NewsService } from '../../services/news-api/news-api.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})

export class BookmarksComponent implements OnInit {

  public bookmarksList: any;

  @Output() source = new EventEmitter();

  // tslint:disable-next-line: no-shadowed-variable
  constructor( private ObservablesService: ObservablesService, private NewsService: NewsService, private FormBuilder: FormBuilder ) {
    this.ObservablesService.getObservableData('bookmarks').subscribe( bookmarksListObserver => {
      if ( bookmarksListObserver === null) { this.bookmarksList = null; } else { this.bookmarksList = bookmarksListObserver; }
    });
  }

// METHODS

  public getNews( source: any ) {
    this.NewsService.getNewsBySource(source);
    this.source.emit(source);
  }

  ngOnInit() {
  }
}
