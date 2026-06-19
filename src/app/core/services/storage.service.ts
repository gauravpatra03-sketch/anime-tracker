import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Anime } from 'src/app/models/anime';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  private favoritesSubject = new BehaviorSubject<Anime[]>(this.getFavorites());
  favorites$ = this.favoritesSubject.asObservable();

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

    // 🔥 notify all components instantly
    this.favoritesSubject.next(updated);
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
}
