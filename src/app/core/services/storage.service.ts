import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  private favoritesSubject = new BehaviorSubject<any[]>(this.getFavorites());
favorites$ = this.favoritesSubject.asObservable();

  getWatchlist() {
    return JSON.parse(
      localStorage.getItem('watchlist') || '[]'
    );
  }

  addToWatchlist(anime: any) {

    const watchlist = this.getWatchlist();

    const exists = watchlist.some(
      (a: any) => a.id === anime.id
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

  updateAnime(updatedAnime: any) {

    const watchlist = this.getWatchlist();

    const updatedWatchlist = watchlist.map(
      (anime: any) => {

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

  toggleFavorite(anime: any) {
  const favorites = this.getFavorites();

  const exists = favorites.some((a: any) => a.id === anime.id);

  let updated;

  if (exists) {
    updated = favorites.filter((a: any) => a.id !== anime.id);
  } else {
    updated = [...favorites, anime];
  }

  localStorage.setItem('favorites', JSON.stringify(updated));

  // 🔥 notify all components instantly
  this.favoritesSubject.next(updated);
}

  isFavorite(anime: any): boolean {
    const favorites = this.getFavorites();
    return favorites.some((a: any) => a.id === anime.id);
  }

  getRecentlyViewed() {
    return JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  }

  addToRecentlyViewed(anime: any) {
    let list = this.getRecentlyViewed();

    // remove if already exists
    list = list.filter((a: any) => a.id !== anime.id);

    // add to top
    list.unshift(anime);

    // keep only last 10
    list = list.slice(0, 10);

    localStorage.setItem('recentlyViewed', JSON.stringify(list));
  }

}
