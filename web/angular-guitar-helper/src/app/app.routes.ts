import { Routes } from '@angular/router';
import {ChordsPageComponent} from './pages/chords-page/chords-page.component';
import {TabsPageComponent} from './pages/tabs-page/tabs-page.component';
import {RecordingPageComponent} from './pages/recording-page/recording-page.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {ChordsMainPageComponent} from './pages/chords-page/nested-pages/chords-main-page/chords-main-page.component';
import {ChordsPracticeComponent} from './pages/chords-page/nested-pages/chords-practice/chords-practice.component';
import {ChordsOverviewComponent} from './pages/chords-page/nested-pages/chords-overview/chords-overview.component';
import {
  ChordsPracticeStartComponent
} from './pages/chords-page/nested-pages/chords-practice-start/chords-practice-start.component';

export const routes: Routes = [
  { path: '', redirectTo: 'chords', pathMatch: 'full' },
  {
    path: 'chords', component: ChordsPageComponent,
    children: [
      {path: '', component: ChordsMainPageComponent},
      {path: 'overview', component: ChordsOverviewComponent},
      {path: 'practice', component: ChordsPracticeComponent},
      {path: 'practice/start', component: ChordsPracticeStartComponent},
    ]
  },
  { path: 'tablature', component: TabsPageComponent },
  { path: 'recording', component: RecordingPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
