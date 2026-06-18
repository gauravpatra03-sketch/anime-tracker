import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private baseUrl = 'https://api.jikan.moe/v4';

  constructor(private http: HttpClient) { }

  searchAnime(search: string) {

    const query = `
    query ($search: String) {
      Page {
        media(
          search: $search,
          type: ANIME
        ) {
          id
          title {
            romaji
            english
          }
          episodes
          coverImage {
            large
          }
          averageScore
        }
      }
    }
  `;

    const variables = {
      search: search
    };

    return this.http.post<any>(
      'https://graphql.anilist.co',
      {
        query,
        variables
      }
    );
  }

  getAnimeById(id: number) {

    const query = `
    query ($id: Int) {
      Media(
        id: $id,
        type: ANIME
      ) {
        id
        title {
          romaji
          english
        }
        description
        episodes
        averageScore
        coverImage {
          large
        }
        bannerImage
        genres
        status
      }
    }
  `;

    return this.http.post<any>(
      'https://graphql.anilist.co',
      {
        query,
        variables: {
          id: id
        }
      }
    );
  }
}
