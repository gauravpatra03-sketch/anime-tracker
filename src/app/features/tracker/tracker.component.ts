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
  ) {}

  ngOnInit() {
    this.watchlist =
      this.storageService.getWatchlist();

    console.log(this.watchlist);
  }
}
