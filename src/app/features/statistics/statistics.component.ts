import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  watchlist: any[] = [];

  totalAnime = 0;
  episodesWatched = 0;
  completed = 0;
  watching = 0;
  planToWatch = 0;
  dropped = 0;
  completionPercentage = 0;

  pieChartType: ChartType = 'pie';

  pieChartData: ChartData<'pie', number[], string> = {
    labels: [
      'Watching',
      'Completed',
      'Plan to Watch',
      'Dropped'
    ],
    datasets: [
      {
        data: [0, 0, 0, 0]
      }
    ]
  };

  constructor(
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.watchlist = this.storageService.getWatchlist();
    this.calculateStats();
  }

  calculateStats() {

    this.totalAnime = this.watchlist.length;

    this.episodesWatched = this.watchlist.reduce(
      (sum, anime) => sum + anime.watchedEpisodes,
      0
    );

    this.completed = this.watchlist.filter(
      anime => anime.status === 'Completed'
    ).length;

    this.watching = this.watchlist.filter(
      anime => anime.status === 'Watching'
    ).length;

    this.planToWatch = this.watchlist.filter(
      anime => anime.status === 'Plan to Watch'
    ).length;

    this.dropped = this.watchlist.filter(
      anime => anime.status === 'Dropped'
    ).length;

    if (this.totalAnime > 0) {
      this.completionPercentage = Math.round(
        (this.completed / this.totalAnime) * 100
      );
    }

    this.pieChartData = {
      ...this.pieChartData,
      datasets: [
        {
          data: [
            this.watching,
            this.completed,
            this.planToWatch,
            this.dropped
          ]
        }
      ]
    };
  }
}