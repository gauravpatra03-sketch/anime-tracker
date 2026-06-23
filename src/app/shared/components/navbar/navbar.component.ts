import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  favoritesCount = 0;

  username = 'Anime Fan';

  showMore = false;

  avatar: string | null = null;

  constructor(
    public themeService: ThemeService,
    private storageService: StorageService,
    private profileService: ProfileService
  ) { }

  toggleMoreMenu(): void {
    this.showMore = !this.showMore;
  }

  ngOnInit() {

    this.storageService.favorites$
      .subscribe(favs => {
        this.favoritesCount = favs.length;
      });

    const profile =
      this.profileService.getProfile();

    this.username =
      profile.username;

    this.avatar =
      profile.avatar || '';
  }
}
