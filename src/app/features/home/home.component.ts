import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Anime } from 'src/app/models/anime.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  watchlist: Anime[] = [];

  totalWatching = 0;
  totalCompleted = 0;
  totalEpisodes = 0;

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {

    this.storageService.watchlist$
      .subscribe((list: Anime[]) => {

        this.watchlist = list;

        this.calculateStats();
      });
  }

  calculateStats() {

    this.totalWatching =
      this.watchlist.filter(
        anime => anime.status === 'Watching'
      ).length;

    this.totalCompleted =
      this.watchlist.filter(
        anime => anime.status === 'Completed'
      ).length;

    this.totalEpisodes =
      this.watchlist.reduce(
        (total, anime) =>
          total + (anime.watchedEpisodes || 0),
        0
      );
  }
}
