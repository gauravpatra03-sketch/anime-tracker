import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Anime } from 'src/app/models/anime.model';


@Component({
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styleUrls: ['./recently-viewed.component.css']
})
export class RecentlyViewedComponent {

  recentlyViewed: Anime[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.recentlyViewed = this.storageService.getRecentlyViewed();
  }
}
