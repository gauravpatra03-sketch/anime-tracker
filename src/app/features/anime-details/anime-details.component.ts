import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from 'src/app/core/services/anime.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.css']
})
export class AnimeDetailsComponent implements OnInit {

  anime: any;

  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.animeService
      .getAnimeById(id)
      .subscribe((response: any) => {
        this.anime =
          response.data.Media;
      });
  }

  addToWatchlist() {

    const animeToSave = {
      id: this.anime.id,
      title: this.anime.title.romaji,
      image: this.anime.coverImage.large,
      episodes: this.anime.episodes,
      watchedEpisodes: 0,
      status: 'Plan to Watch'
    };

    const added =
      this.storageService
        .addToWatchlist(animeToSave);

    if (added) {
      alert('Added to watchlist!');
    } else {
      alert('Anime already exists!');
    }
  }
}