import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Anime } from 'src/app/models/anime.model';


@Component({
  selector: 'app-continue-watching',
  templateUrl: './continue-watching.component.html',
  styleUrls: ['./continue-watching.component.css']
})
export class ContinueWatchingComponent
implements OnInit {

  continueWatching: Anime[] = [];

  constructor(
    private storageService: StorageService
  ) {}

  ngOnInit(): void {

    this.continueWatching =
      this.storageService
        .getWatchlist()
        .filter(
          (anime: Anime) =>
            (anime.watchedEpisodes ?? 0) > 0 &&
            (anime.watchedEpisodes ?? 0)
            <
            (anime.episodes ?? 0)
        );
  }

}