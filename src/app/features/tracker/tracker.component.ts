import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})

export class TrackerComponent {

  watchlist: any[] = [];

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

  increaseEpisode(anime: any) {

    if (
      anime.watchedEpisodes
      <
      anime.episodes
    ) {

      anime.watchedEpisodes++;

      this.storageService
        .updateAnime(anime);
    }
  }

  decreaseEpisode(anime: any) {

    if (
      anime.watchedEpisodes > 0
    ) {

      anime.watchedEpisodes--;

      this.storageService
        .updateAnime(anime);
    }
  }

  updateStatus(anime: any) {
    this.storageService
      .updateAnime(anime);
  }
}
