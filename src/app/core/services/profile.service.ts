import { Injectable } from '@angular/core';
import { UserProfile } from '../../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private storageKey = 'userProfile';

  private defaultProfile: UserProfile = {

    username: 'Anime Fan',

    avatar: '',

    bio: 'I love anime!',

    favoriteAnime: '',

    favoriteGenre: '',

    favoriteCharacter: ''
  };

  getProfile(): UserProfile {

    const data =
      localStorage.getItem(
        this.storageKey
      );

    return data
      ? JSON.parse(data)
      : this.defaultProfile;
  }

  saveProfile(
    profile: UserProfile
  ) {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(profile)
    );
  }
}
