import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SearchComponent } from './features/search/search.component';
import { AnimeDetailsComponent } from './features/anime-details/anime-details.component';
import { TrackerComponent } from './features/tracker/tracker.component';
import { StatisticsComponent } from './features/statistics/statistics.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { RecentlyViewedComponent } from './features/recently-viewed/recently-viewed.component';
import { ContinueWatchingComponent } from './features/continue-watching/continue-watching.component';
import { ProfileComponent } from './features/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'anime/:id', component: AnimeDetailsComponent },
  { path: 'tracker', component: TrackerComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'recent', component: RecentlyViewedComponent },
  { path: 'continue-watching', component: ContinueWatchingComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
