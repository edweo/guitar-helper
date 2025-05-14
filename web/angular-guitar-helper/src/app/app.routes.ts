import { Routes } from '@angular/router';
import {ChordsPageComponent} from './pages/chords-page/chords-page.component';
import {TabsPageComponent} from './pages/tabs-page/tabs-page.component';
import {RecordingPageComponent} from './pages/recording-page/recording-page.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'chords', pathMatch: 'full' },
  { path: 'chords', component: ChordsPageComponent },
  { path: 'tabs', component: TabsPageComponent },
  { path: 'recording', component: RecordingPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
