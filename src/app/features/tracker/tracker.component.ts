import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Anime } from 'src/app/models/anime.model';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent {

  watchlist: Anime[] = [];

  searchText = '';
  selectedStatus = 'All';
  sortOption = 'title-asc';

  constructor(
    private storageService: StorageService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.storageService.watchlist$
      .subscribe((watchlist: Anime[]) => {
        this.watchlist = watchlist;
      });
  }

  increaseEpisode(anime: Anime) {

    if (
      (anime.watchedEpisodes ?? 0) <
      (anime.episodes ?? 0)
    ) {

      anime.watchedEpisodes =
        (anime.watchedEpisodes ?? 0) + 1;
      this.toastService.success(
        `${this.getTitle(anime)}
  - Episode
  ${anime.watchedEpisodes}
  watched ✅`
      );

      if (
        anime.watchedEpisodes ===
        anime.episodes
      ) {

        anime.status = 'Completed';

        this.toastService.success(
          `${this.getTitle(anime)} completed 🎉`
        );
      }

      this.storageService.updateAnime(anime);
    }
  }

  decreaseEpisode(anime: Anime) {

    if (
      (anime.watchedEpisodes ?? 0) > 0
    ) {

      anime.watchedEpisodes =
        (anime.watchedEpisodes ?? 0) - 1;
      this.toastService.info(
        `${this.getTitle(anime)}
  reverted to Episode
  ${anime.watchedEpisodes}`
      );

      this.storageService.updateAnime(anime);
    }
  }

  updateStatus(anime: Anime) {

    this.storageService
      .updateAnime(anime);

    this.toastService.info(
      `${this.getTitle(anime)}
    marked as
    ${anime.status}`
    );
  }

  removeAnime(anime: Anime) {

    this.storageService
      .removeAnime(
        anime.id
      );

    this.toastService.error(
      `${this.getTitle(anime)}
    removed from Watchlist 🗑️`
    );
  }

  exportWatchlist() {

    this.storageService
      .exportWatchlist();

    this.toastService.success(
      'Watchlist exported 💾'
    );
  }

  onImport(event: Event) {

    const input =
      event.target as HTMLInputElement;

    if (
      !input.files ||
      input.files.length === 0
    ) {
      return;
    }

    const file =
      input.files[0];

    const reader =
      new FileReader();

    reader.onload = () => {

      try {

        const animes =
          JSON.parse(
            reader.result as string
          );

        this.storageService
          .importWatchlist(animes);
        this.toastService.success(
          'Watchlist imported successfully 📂'
        );

      } catch {

        this.toastService.error(
          'Invalid JSON file ❌'
        );
      }
    };

    reader.readAsText(file);
  }

  getTitle(anime: Anime): string {

    if (
      typeof anime.title === 'string'
    ) {
      return anime.title;
    }

    return (
      anime.title?.english ||
      anime.title?.romaji ||
      ''
    );
  }

  getImage(anime: Anime): string {

    return (
      anime.coverImage?.large ||
      anime.image ||
      ''
    );
  }

  getFilteredWatchlist(): Anime[] {

    const filtered =
      this.watchlist.filter(
        (anime: Anime) => {

          const title =
            this.getTitle(anime);

          const matchesSearch =
            title
              .toLowerCase()
              .includes(
                this.searchText.toLowerCase()
              );

          const matchesStatus =
            this.selectedStatus === 'All' ||
            anime.status ===
            this.selectedStatus;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );

    filtered.sort(
      (a: Anime, b: Anime) => {

        const titleA =
          this.getTitle(a);

        const titleB =
          this.getTitle(b);

        switch (
        this.sortOption
        ) {

          case 'title-asc':
            return titleA
              .localeCompare(
                titleB
              );

          case 'title-desc':
            return titleB
              .localeCompare(
                titleA
              );

          case 'watched':
            return (
              (b.watchedEpisodes ?? 0)
              -
              (a.watchedEpisodes ?? 0)
            );

          case 'remaining':
            return (
              ((a.episodes ?? 0)
                -
                (a.watchedEpisodes ?? 0))
              -
              ((b.episodes ?? 0)
                -
                (b.watchedEpisodes ?? 0))
            );

          case 'status':
            return (
              a.status ?? ''
            ).localeCompare(
              b.status ?? ''
            );

          default:
            return 0;
        }
      }
    );

    return filtered;
  }
}
