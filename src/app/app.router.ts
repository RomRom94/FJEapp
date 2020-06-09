// IMPORT
import { Routes } from '@angular/router';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { ConnectedComponent } from './routes/connected/connected.component';
import { AuthGuard } from './auth.guard';

// EXPORT

export const AppRouterModule: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'connected',
    component: ConnectedComponent,
    canActivate: [ AuthGuard ]
  }
];
