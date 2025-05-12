import { Routes } from '@angular/router';
import {ChordsPageComponent} from './pages/chords-page/chords-page.component';
import {TabsPageComponent} from './pages/tabs-page/tabs-page.component';

export const routes: Routes = [
  { path: 'chords', component: ChordsPageComponent },
  { path: 'tabs', component: TabsPageComponent },
  { path: '',   redirectTo: 'chords', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
];
