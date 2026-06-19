import { Component, Input } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-anime-card',
  templateUrl: './anime-card.component.html',
  styleUrls: ['./anime-card.component.css']
})
export class AnimeCardComponent {

  @Input() anime: any;

  isFav = false;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.favorites$.subscribe(favs => {
      this.isFav = favs.some((a: any) => a.id === this.anime.id);
    });
  }

  toggleFavorite(anime: any) {
    this.storageService.toggleFavorite(anime);
    this.isFav = this.storageService.isFavorite(anime);
  }
}
