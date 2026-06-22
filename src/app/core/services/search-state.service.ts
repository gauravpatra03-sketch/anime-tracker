import { Injectable } from '@angular/core';
import { Anime } from 'src/app/models/anime.model';

@Injectable({ providedIn: 'root' })
export class SearchStateService {

  query = '';
  page = 1;

  results: Anime[] = [];
  scrollY = 0;

  cache = new Map<string, Anime[]>();

  save(query: string, page: number, results: Anime[]) {
    this.query = query;
    this.page = page;
    this.results = results;
  }

  saveScroll(y: number) {
    this.scrollY = y;
  }

  getCacheKey(query: string, page: number) {
    return `${query}-${page}`;
  }

  clearState() {
    this.query = '';
    this.page = 1;
    this.results = [];
    this.scrollY = 0;
  }
}