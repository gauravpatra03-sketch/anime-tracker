import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {

  favorites: any[] = [];

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.favorites$.subscribe(favs => {
      this.favorites = favs;
    });
  }

  loadFavorites() {
    this.favorites = this.storageService.getFavorites();
  }

  remove(anime: any) {
    this.storageService.toggleFavorite(anime);
    this.loadFavorites();
  }
}