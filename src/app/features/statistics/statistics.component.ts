import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  watchlist: any[] = [];

  totalAnime = 0;
  episodesWatched = 0;
  completed = 0;
  watching = 0;
  planToWatch = 0;
  dropped = 0;
  completionPercentage = 0;

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.watchlist =
      this.storageService.getWatchlist();

    this.calculateStats();
  }

  calculateStats() {

    // Total anime
    this.totalAnime =
      this.watchlist.length;

    // Total episodes watched
    this.episodesWatched =
      this.watchlist.reduce(
        (sum, anime) =>
          sum + anime.watchedEpisodes,
        0
      );

    // Completed anime
    this.completed =
      this.watchlist.filter(
        anime =>
          anime.status === 'Completed'
      ).length;

    // Currently watching
    this.watching =
      this.watchlist.filter(
        anime =>
          anime.status === 'Watching'
      ).length;

    // Plan to watch
    this.planToWatch =
      this.watchlist.filter(
        anime =>
          anime.status === 'Plan to Watch'
      ).length;

    // Dropped anime
    this.dropped =
      this.watchlist.filter(
        anime =>
          anime.status === 'Dropped'
      ).length;

    // Completion percentage
    if (this.totalAnime > 0) {
      this.completionPercentage =
        Math.round(
          (this.completed /
            this.totalAnime) * 100
        );
    }
  }
}