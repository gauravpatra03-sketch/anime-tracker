import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

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

}
