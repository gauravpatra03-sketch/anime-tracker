import { Component } from '@angular/core';
import { AnimeService } from 'src/app/core/services/anime.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(
    private animeService: AnimeService
  ) { }
  searchText = '';
  animes: any[] = [];
  search() {
    this.animeService
      .searchAnime(this.searchText)
      .subscribe(response => {
        this.animes = response.data;
      });
  }
}
