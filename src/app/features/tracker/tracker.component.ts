import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Anime } from 'src/app/models/anime';


@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})

export class TrackerComponent {

  watchlist: Anime[] = [];

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.watchlist =
      this.storageService.getWatchlist();

    console.log(this.watchlist);
    console.log(
      'Is Array:',
      Array.isArray(this.watchlist)
    );
  }

  increaseEpisode(anime: Anime) {

    if (
      (anime.watchedEpisodes ?? 0) <
      (anime.episodes ?? 0)
    ) {

      anime.watchedEpisodes =
        (anime.watchedEpisodes ?? 0) + 1;

      this.storageService
        .updateAnime(anime);
    }
  }

  decreaseEpisode(anime: Anime) {

    if ((anime.watchedEpisodes ?? 0) > 0) {

      anime.watchedEpisodes =
        (anime.watchedEpisodes ?? 0) - 1;

      this.storageService
        .updateAnime(anime);
    }
  }

  updateStatus(anime: Anime) {
    this.storageService
      .updateAnime(anime);
  }
}
