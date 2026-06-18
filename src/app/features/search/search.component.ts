import { Component, OnInit } from '@angular/core';
import { AnimeService } from 'src/app/core/services/anime.service';
import {
  Subject,
  debounceTime,
  distinctUntilChanged
} from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchText: string = '';
  animes: any[] = [];

  isLoading = false;
  errorMessage = '';

  private searchSubject =
    new Subject<string>();

  constructor(private animeService: AnimeService) { }

  search() {

    if (this.searchText.trim().length < 3) {
      this.animes = [];
      this.errorMessage =
        'Please type at least 3 characters.';
        this.isLoading = false;
        return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.animeService
      .searchAnime(this.searchText)
      .pipe(
        retry(2)
      )
      .subscribe({
        next: (res: any) => {
          this.animes = res.data || [];
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage =
            'Anime API is currently slow. Please try again.';
          this.animes = [];
          this.isLoading = false;
        }
      });
  }

  searchAnime(query: string) {

    this.isLoading = true;
    this.errorMessage = '';

    this.animeService
      .searchAnime(query)
      .pipe(
        retry(2)
      )
      .subscribe({
        next: (res) => {
          this.animes = res.data || [];
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage =
            'Anime API is currently slow. Please try again.';
          this.animes = [];
          this.isLoading = false;
        }
      });
  }

  onSearch() {
    console.log('Input changed:', this.searchText);
    this.searchSubject.next(
      this.searchText
    );
  }

  ngOnInit() {

    this.searchSubject
      .pipe(
        debounceTime(800),
        distinctUntilChanged()
      )
      .subscribe(query => {

        query = query.trim();

        if (query.length < 3) {
          this.animes = [];
          return;
        }

        this.searchAnime(query);
      });

  }

}
