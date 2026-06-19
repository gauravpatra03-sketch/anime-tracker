import { Component, Input } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Anime } from 'src/app/models/anime';


@Component({
  selector: 'app-anime-card',
  templateUrl: './anime-card.component.html',
  styleUrls: ['./anime-card.component.css']
})
export class AnimeCardComponent {

  @Input() anime!: Anime;

  isFav = false;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.favorites$.subscribe(favs => {
      this.isFav = favs.some((a: Anime) => a.id === this.anime.id);
    });
  }

  toggleFavorite(anime: Anime) {
    this.storageService.toggleFavorite(anime);
    this.isFav = this.storageService.isFavorite(anime);
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
