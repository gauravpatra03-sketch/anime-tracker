import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Anime } from 'src/app/models/anime';


@Component({
  selector: 'app-continue-watching',
  templateUrl: './continue-watching.component.html',
  styleUrls: ['./continue-watching.component.css']
})
export class ContinueWatchingComponent {

  animeList: Anime[] = [];

  constructor(
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.animeList =
      this.storageService.getContinueWatching();
  }
}
