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
    console.log('Storage Service Called');

    const watchlist = this.getWatchlist();

    console.log('Before Push:', watchlist);

    watchlist.push(anime);

    console.log('After Push:', watchlist);

    localStorage.setItem(
      'watchlist',
      JSON.stringify(watchlist)
    );
    
    console.log(
      'Saved:',
      localStorage.getItem('watchlist')
    );

  }

}
