import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { ConnectedComponent } from './routes/connected/connected.component';
import { ArticleComponent } from './shared/article/article.component';
import { BookmarksComponent } from './shared/bookmarks/bookmarks.component';
import { FormRegisterComponent } from './shared/form-register/form-register.component';
import { FormLoginComponent } from './shared/form-login/form-login.component';
import { FormSearchComponent } from './shared/form-search/form-search.component';

import { RouterModule } from '@angular/router';
import { AppRouterModule } from './app.router';

import { AuthService } from './services/auth/auth.service';
import { NewsService } from './services/news-api/news-api.service';
import { ObservablesService } from './services/observable/observable.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormLoginComponent,
    FormSearchComponent,
    FormRegisterComponent,
    HomePageComponent,
    ConnectedComponent,
    ArticleComponent,
    BookmarksComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot( AppRouterModule, { onSameUrlNavigation: 'reload' } ),
  ],
  providers: [AuthService, ObservablesService, NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
