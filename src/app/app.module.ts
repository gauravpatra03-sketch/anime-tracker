import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
