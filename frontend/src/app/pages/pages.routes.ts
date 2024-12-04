import { Routes } from '@angular/router';
import { homeComponent } from './home/home.component';
import { ArtistListComponent } from './artist-list/artist-list.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: homeComponent,
    data: {
      title: 'Home',
      urls: [
        { title: 'Dashboard', url: '/home' },
        { title: 'Home' },
      ],
    },
  },
  {
    path: 'artist-list', 
    component: ArtistListComponent,
    data: {
      title: 'Artist List',
      urls: [
        { title: 'Dashboard', url: '/home' },
        { title: 'Artist List' },
      ],
    },
  }
];
