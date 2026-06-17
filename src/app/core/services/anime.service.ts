import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private baseUrl = 'https://api.jikan.moe/v4';

  constructor(private http: HttpClient) { }

  searchAnime(query: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/anime?q=${query}`
    );
  }

  getAnimeById(id: number) {
    return this.http.get<any>(
      `${this.baseUrl}/anime/${id}`
    );
  }
}
