import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styleUrls: ['./recently-viewed.component.css']
})
export class RecentlyViewedComponent {

  recentlyViewed: any[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.recentlyViewed = this.storageService.getRecentlyViewed();
  }
}
