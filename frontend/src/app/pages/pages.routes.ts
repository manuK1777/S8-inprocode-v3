import { Routes } from '@angular/router';
import { homeComponent } from './home/home.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';

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
  },
  {
    path: 'artist/:id/:slug', // Include both ID and slug in the path
    component: ArtistDetailComponent,
    data: {
      title: 'Artist Details',
      urls: [
        { title: 'Dashboard', url: '/home' },
        { title: 'Artist List', url: '/artist-list' },
        { title: 'Artist Details' },
      ],
    },
  },
];


