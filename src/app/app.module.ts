import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AnimeCardComponent } from './shared/components/anime-card/anime-card.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';
import { HomeComponent } from './features/home/home.component';
import { SearchComponent } from './features/search/search.component';
import { AnimeDetailsComponent } from './features/anime-details/anime-details.component';
import { TrackerComponent } from './features/tracker/tracker.component';
import { StatisticsComponent } from './features/statistics/statistics.component';
import { SettingsComponent } from './features/settings/settings.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { RecentlyViewedComponent } from './features/recently-viewed/recently-viewed.component';
import { ContinueWatchingComponent } from './features/continue-watching/continue-watching.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AnimeCardComponent,
    LoaderComponent,
    ProgressBarComponent,
    HomeComponent,
    SearchComponent,
    AnimeDetailsComponent,
    TrackerComponent,
    StatisticsComponent,
    SettingsComponent,
    FavoritesComponent,
    RecentlyViewedComponent,
    ContinueWatchingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
