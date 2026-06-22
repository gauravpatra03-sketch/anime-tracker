import {
  Component,
  OnInit
} from '@angular/core';

import { Anime } from 'src/app/models/anime.model';

import { UserProfile }
  from 'src/app/models/user-profile.model';

import { ProfileService }
  from 'src/app/core/services/profile.service';

import { StorageService }
  from 'src/app/core/services/storage.service';

import { ToastService }
  from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl:
    './profile.component.html',
  styleUrls:
    ['./profile.component.css']
})
export class ProfileComponent
  implements OnInit {

  profile!: UserProfile;

  totalWatching = 0;
  totalCompleted = 0;
  totalEpisodes = 0;

  constructor(
    private profileService:
      ProfileService,

    private storageService:
      StorageService,

    private toastService:
      ToastService
  ) { }

  ngOnInit() {

    this.profile =
      this.profileService
        .getProfile();

    this.loadStats();
  }

  saveProfile() {

    this.profileService
      .saveProfile(
        this.profile
      );

    this.toastService.success(
      'Profile updated successfully 👤'
    );
  }

  loadStats() {

    const tracker: Anime[] =
      this.storageService
        .getWatchlist();

    this.totalWatching =
      tracker.filter(
        (anime: Anime) =>
          anime.status === 'Watching'
      ).length;

    this.totalCompleted =
      tracker.filter(
        (anime: Anime) =>
          anime.status === 'Completed'
      ).length;

    this.totalEpisodes =
      tracker.reduce(
        (
          sum: number,
          anime: Anime
        ) =>
          sum +
          (anime.watchedEpisodes || 0),
        0
      );
  }

  onAvatarSelected(
    event: Event
  ) {

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

      this.profile.avatar =
        reader.result as string;

      this.saveProfile();
    };

    reader.readAsDataURL(
      file
    );
  }
}
