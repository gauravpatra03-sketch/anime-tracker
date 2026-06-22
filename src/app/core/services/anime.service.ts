import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Anime } from 'src/app/models/anime.model';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private searchCache =
    new Map<string, Anime[]>();

  constructor(
    private http: HttpClient
  ) { }

  searchAnime(
    query: string,
    page: number = 1
  ) {

    const queryText =
      query
        .trim()
        .toLowerCase();

    const cacheKey =
      `${queryText}-${page}`;

    if (
      this.searchCache.has(cacheKey)
    ) {
      return of(
        this.searchCache.get(cacheKey)!
      );
    }

    const gqlQuery = `
    query (
      $search: String,
      $page: Int
    ) {
      Page(
        page: $page,
        perPage: 10
      ) {
        media(
          search: $search,
          type: ANIME
        ) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          episodes
          averageScore
        }
      }
    }
  `;

    return this.http.post<any>(
      'https://graphql.anilist.co',
      {
        query: gqlQuery,
        variables: {
          search: queryText,
          page: page
        }
      }
    ).pipe(

      map(response => {

        return (
          response.data.Page.media || []
        ) as Anime[];

      }),

      tap((animes: Anime[]) => {

        this.searchCache.set(
          cacheKey,
          animes
        );

        console.log(
          'Saved to cache:',
          cacheKey
        );

      })
    );
  }

  getAnimeById(
    id: number
  ) {

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
