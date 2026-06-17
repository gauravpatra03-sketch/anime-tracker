import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from 'src/app/core/services/anime.service';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.css']
})
export class AnimeDetailsComponent implements OnInit {

  anime: any;

  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService
  ) {}

  ngOnInit(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.animeService
      .getAnimeById(id)
      .subscribe((response: any) => {
        this.anime = response.data;
      });
  }
}