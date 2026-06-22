import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Anime } from 'src/app/models/anime.model';
import { ToastService }
  from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {

  favorites: Anime[] = [];

  constructor(
    private storageService: StorageService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.storageService.favorites$.subscribe(favs => {
      this.favorites = favs;
    });
  }

  loadFavorites() {
    this.favorites = this.storageService.getFavorites();
  }

  remove(anime: Anime) {

    this.storageService
      .toggleFavorite(anime);

    const title =
      typeof anime.title === 'string'
        ? anime.title
        : anime.title?.english ||
        anime.title?.romaji ||
        'Anime';

    this.toastService.warning(
      `${title} removed from Favorites 💔`
    );
  }
}