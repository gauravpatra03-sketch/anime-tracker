import { Anime } from './anime';

export interface UserAnime extends Anime {

  watchedEpisodes: number;

  status: 'Plan to Watch' | 'Watching' | 'Completed' | 'Dropped' | 'On Hold';
}