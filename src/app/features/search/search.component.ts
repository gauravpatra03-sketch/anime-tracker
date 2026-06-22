import {
  Component,
  OnInit
} from '@angular/core';
import { AnimeService } from 'src/app/core/services/anime.service';
import {
  Subject,
  debounceTime,
  distinctUntilChanged
} from 'rxjs';
import { retry } from 'rxjs/operators';
import { Anime } from 'src/app/models/anime.model';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Location } from '@angular/common';
import { SearchStateService } from 'src/app/core/services/search-state.service';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchText: string = '';
  animes: Anime[] = [];
  page = 1;
  hasMore = true;
  isLoadingMore = false;
  loading = false;
  errorMessage = '';

  private searchSubject =
    new Subject<string>();

  constructor(
    private animeService: AnimeService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private searchState: SearchStateService
  ) { }

  goBack() {
    this.location.back();
  }

  search() {

    const query =
      this.searchText.trim();

    if (query.length < 3) {
      this.animes = [];
      return;
    }

    this.page = 1;

    this.router.navigate(
      ['/search'],
      {
        queryParams: {
          q: query,
          page: 1
        }
      }
    );
  }

  performSearch(query: string, append = false) {

    const key = this.searchState.getCacheKey(query, this.page);

    // 🔥 1. CHECK MEMORY CACHE FIRST
    if (this.searchState.cache.has(key)) {

      const cached = this.searchState.cache.get(key)!;

      this.animes = append
        ? [...this.animes, ...cached]
        : cached;

      return;
    }

    this.loading = true;

    this.animeService.searchAnime(query, this.page)
      .subscribe({
        next: (animes: Anime[]) => {

          this.searchState.cache.set(
            this.searchState.getCacheKey(query, this.page),
            animes
          );

          this.animes = append
            ? [...this.animes, ...animes]
            : animes;

          // 🔥 SAVE AFTER UI UPDATE
          setTimeout(() => {
            this.searchState.save(
              query,
              this.page,
              this.animes
            );
          });

          this.loading = false;
        }
      })
  }

  onSearch() {
    this.page = 1;
    this.searchSubject.next(this.searchText);
  }

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => {

        const q = params['q'];
        const page =
          Number(params['page']) || 1;

        if (q) {

          this.searchText = q;
          this.page = page;

          const key =
            this.searchState
              .getCacheKey(q, page);

          if (
            this.searchState.cache.has(key)
          ) {

            this.animes =
              this.searchState
                .cache
                .get(key)!;

            return;
          }

          this.performSearch(q);
        }
      });

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

        this.page = 1;

        this.router.navigate(
          ['/search'],
          {
            queryParams: {
              q: query,
              page: 1
            }
          }
        );
      });
  }

  loadMore() {

    if (
      this.loading ||
      this.isLoadingMore
    ) {
      return;
    }

    this.page++;

    this.router.navigate(
      ['/search'],
      {
        queryParams: {
          q: this.searchText.trim(),
          page: this.page
        }
      }
    );
  }

  @HostListener('window:scroll')
  onScroll() {
    this.searchState.saveScroll(window.scrollY);
  }


}
