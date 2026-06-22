import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from 'src/app/core/services/anime.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Anime } from 'src/app/models/anime.model';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.css']
})
export class AnimeDetailsComponent implements OnInit {

  anime?: Anime;

  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService,
    private storageService: StorageService,
    private location: Location,
    private toastService: ToastService
  ) { }

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.animeService.getAnimeById(id).subscribe({
      next: (response: any) => {
        console.log("API RESPONSE:", response);

        const media = response.data.Media;

        this.anime = {
          id: media.id,
          title: media.title,
          coverImage: media.coverImage,
          episodes: media.episodes,
          score: media.averageScore,
          synopsis: media.description
        };

        this.storageService.addToRecentlyViewed(this.anime);
      },
      error: (err) => {
        console.log("API ERROR:", err);
      }
    });
  }

  addToWatchlist() {

    if (!this.anime) {
      return;
    }

    const animeToSave: Anime = {
      id: this.anime.id,

      title:
        typeof this.anime.title === 'string'
          ? this.anime.title
          : this.anime.title?.romaji || '',

      image:
        this.anime.coverImage?.large || '',

      episodes:
        this.anime.episodes,

      watchedEpisodes: 0,

      status: 'Plan to Watch'
    };

    const added =
      this.storageService
        .addToWatchlist(animeToSave);

    if (added) {

      this.toastService.success(
        `${this.getTitle()} added to Watchlist ✅`
      );
    }
    else {

      this.toastService.warning(
        `${this.getTitle()} already exists ⚠️`
      );
    }
  }

  getTitle(): string {
    if (!this.anime) {
      return '';
    }

    if (typeof this.anime.title === 'string') {
      return this.anime.title;
    }

    return (
      this.anime.title?.english ||
      this.anime.title?.romaji ||
      ''
    );
  }


}