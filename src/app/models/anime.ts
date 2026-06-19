export interface Anime {

  id: number;

  title:
    | string
    | {
        romaji?: string;
        english?: string;
      };

  image?: string;

  coverImage?: {
    large?: string;
  };

  episodes?: number;

  score?: number;

  synopsis?: string;

  watchedEpisodes?: number;

  status?:
    | 'Plan to Watch'
    | 'Watching'
    | 'Completed'
    | 'Dropped'
    | 'On Hold';
}