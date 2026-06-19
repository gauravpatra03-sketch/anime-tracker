import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SearchComponent } from './features/search/search.component';
import { AnimeDetailsComponent } from './features/anime-details/anime-details.component';
import { TrackerComponent } from './features/tracker/tracker.component';
import { StatisticsComponent } from './features/statistics/statistics.component';
import { SettingsComponent } from './features/settings/settings.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { RecentlyViewedComponent } from './features/recently-viewed/recently-viewed.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'anime/:id', component: AnimeDetailsComponent },
  { path: 'tracker', component: TrackerComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'recent', component: RecentlyViewedComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
