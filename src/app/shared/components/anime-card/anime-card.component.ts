import { Component, Input } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Anime } from 'src/app/models/anime.model';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-anime-card',
  templateUrl: './anime-card.component.html',
  styleUrls: ['./anime-card.component.css']
})
export class AnimeCardComponent {

  @Input() anime!: Anime;

  isFav = false;

  constructor(
    private storageService: StorageService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.storageService.favorites$.subscribe(favs => {
      this.isFav = favs.some((a: Anime) => a.id === this.anime.id);
    });
  }

  toggleFavorite(anime: Anime) {

    const wasFavorite =
      this.storageService
        .isFavorite(anime);

    this.storageService
      .toggleFavorite(anime);

    this.isFav =
      this.storageService
        .isFavorite(anime);

    const title =
      this.getTitle();

    if (!wasFavorite) {

      this.toastService.info(
        `${title} added to Favorites ❤️`
      );
    }
    else {

      this.toastService.warning(
        `${title} removed from Favorites 💔`
      );
    }
  }

  getImage(): string {
    return (
      this.anime.coverImage?.large ||
      this.anime.image ||
      ''
    );
  }

  getTitle(): string {

    if (typeof this.anime.title === 'string') {
      return this.anime.title;
    }

    return (
      this.anime.title?.english ||
      this.anime.title?.romaji ||
      'Unknown'
    );
  }
}
