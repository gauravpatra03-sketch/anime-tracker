import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { ChartData, ChartType, ChartOptions } from 'chart.js';
import { Anime } from 'src/app/models/anime.model';
import { ThemeService } from 'src/app/core/services/theme.service';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  watchlist: Anime[] = [];

  totalAnime = 0;
  episodesWatched = 0;
  completed = 0;
  watching = 0;
  planToWatch = 0;
  dropped = 0;
  completionPercentage = 0;

  pieChartType: 'pie' = 'pie';

  pieChartData: ChartData<'pie', number[], string> = {
    labels: [
      'Watching',
      'Completed',
      'Plan to Watch',
      'Dropped'
    ],

    datasets: [
      {
        data: [0, 0, 0, 0],

        backgroundColor: [
          '#7c5cff',
          '#3ddc97',
          '#f7c948',
          '#ff6b6b'
        ],

        borderColor: [
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff'
        ],

        borderWidth: 3,

        hoverOffset: 20
      }
    ]
  };

  constructor(
    private storageService: StorageService,
    public themeService: ThemeService
  ) { }

  get chartColors() {

    return this.themeService.isDarkMode
      ? [
        '#9f7aea',
        '#48bb78',
        '#f6e05e',
        '#fc8181',
        '#63b3ed'
      ]
      : [
        '#7c5cff',
        '#3ddc97',
        '#f7c948',
        '#ff6b6b',
        '#4dabf7'
      ];
  }

  pieChartOptions: ChartOptions<'pie'> = {

    responsive: true,

    plugins: {

      legend: {

        position: 'bottom',

        labels: {

          color:
            this.themeService.isDarkMode
              ? '#ffffff'
              : '#222222',

          padding: 25,

          font: {
            size: 14
          }
        }
      }
    }
  };

  ngOnInit(): void {

    this.storageService
      .watchlist$
      .subscribe(
        (watchlist: Anime[]) => {

          this.watchlist = watchlist;

          this.calculateStats();
        }
      );

  }

  calculateStats() {

    this.totalAnime = this.watchlist.length;

    this.episodesWatched =
      this.watchlist.reduce(
        (sum, anime) =>
          sum + (anime.watchedEpisodes ?? 0),
        0
      );

    this.completed =
      this.watchlist.filter(
        anime => anime.status === 'Completed'
      ).length;

    this.watching =
      this.watchlist.filter(
        anime => anime.status === 'Watching'
      ).length;

    this.planToWatch =
      this.watchlist.filter(
        anime => anime.status === 'Plan to Watch'
      ).length;

    this.dropped =
      this.watchlist.filter(
        anime => anime.status === 'Dropped'
      ).length;

    this.completionPercentage =
      this.totalAnime > 0
        ? Math.round(
          (this.completed / this.totalAnime) * 100
        )
        : 0;

    this.pieChartData.datasets[0].data = [
      this.watching,
      this.completed,
      this.planToWatch,
      this.dropped
    ];

    this.pieChartData.datasets[0].backgroundColor =
      this.chartColors;
  }
}