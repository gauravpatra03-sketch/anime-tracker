import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Anime } from 'src/app/models/anime.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  private watchlistSubject =
    new BehaviorSubject<Anime[]>(
      this.getWatchlist()
    );

  watchlist$ =
    this.watchlistSubject.asObservable();

  private favoritesSubject =
    new BehaviorSubject<Anime[]>(
      this.getFavorites()
    );

  favorites$ =
    this.favoritesSubject
      .asObservable();

  private recentSubject =
    new BehaviorSubject<Anime[]>(
      this.getRecentlyViewed()
    );

  recentlyViewed$ =
    this.recentSubject.asObservable();

  getWatchlist() {
    return JSON.parse(
      localStorage.getItem('watchlist') || '[]'
    );
  }

  addToWatchlist(anime: Anime) {

    const watchlist = this.getWatchlist();

    const exists = watchlist.some(
      (a: Anime) => a.id === anime.id
    );

    if (exists) {
      return false;
    }

    watchlist.push(anime);

    localStorage.setItem(
      'watchlist',
      JSON.stringify(watchlist)
    );

    this.watchlistSubject.next(
      watchlist
    );

    return true;
  }

  updateAnime(updatedAnime: Anime) {

    const watchlist = this.getWatchlist();

    const updatedWatchlist = watchlist.map(
      (anime: Anime) => {

        if (anime.id === updatedAnime.id) {
          return updatedAnime;
        }

        return anime;
      }
    );

    localStorage.setItem(
      'watchlist',
      JSON.stringify(updatedWatchlist)
    );

    this.watchlistSubject.next(
      updatedWatchlist
    );
  }

  removeAnime(id: number) {

    const watchlist =
      this.getWatchlist();

    const updatedWatchlist =
      watchlist.filter(
        (anime: Anime) =>
          anime.id !== id
      );

    localStorage.setItem(
      'watchlist',
      JSON.stringify(
        updatedWatchlist
      )
    );

    this.watchlistSubject.next(
      updatedWatchlist
    );
  }

  getFavorites() {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  toggleFavorite(anime: Anime) {
    const favorites = this.getFavorites();

    const exists = favorites.some((a: Anime) => a.id === anime.id);

    let updated;

    if (exists) {
      updated = favorites.filter((a: Anime) => a.id !== anime.id);
    } else {
      updated = [...favorites, anime];
    }

    localStorage.setItem('favorites', JSON.stringify(updated));

    this.favoritesSubject.next(
      updated
    );
    
  }

  isFavorite(anime: Anime): boolean {
    const favorites = this.getFavorites();
    return favorites.some((a: Anime) => a.id === anime.id);
  }

  getRecentlyViewed() {
    return JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  }

  addToRecentlyViewed(anime: Anime) {
    let list = this.getRecentlyViewed();

    // remove if already exists
    list = list.filter((a: Anime) => a.id !== anime.id);

    // add to top
    list.unshift(anime);

    // keep only last 10
    list = list.slice(0, 10);

    localStorage.setItem('recentlyViewed', JSON.stringify(list));

    this.recentSubject.next(
      list
    );
  }

  getContinueWatching() {
    const watchlist = this.getWatchlist();

    return watchlist.filter(
      (anime: Anime) =>
        anime.watchedEpisodes &&
        anime.episodes &&
        anime.watchedEpisodes > 0 &&
        anime.watchedEpisodes < anime.episodes
    );
  }

  exportWatchlist() {

    const watchlist =
      this.getWatchlist();

    const json =
      JSON.stringify(
        watchlist,
        null,
        2
      );

    const blob =
      new Blob(
        [json],
        {
          type:
            'application/json'
        }
      );

    const url =
      window.URL.createObjectURL(
        blob
      );

    const a =
      document.createElement('a');

    a.href = url;

    a.download =
      'watchlist.json';

    a.click();

    window.URL
      .revokeObjectURL(url);
  }

  importWatchlist(
    animes: Anime[]
  ) {

    localStorage.setItem(
      'watchlist',
      JSON.stringify(animes)
    );

    this.watchlistSubject.next(
      animes
    );
  }
}
