import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  favoritesCount = 0;

  constructor(
    public themeService: ThemeService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.storageService.favorites$.subscribe(favs => {
      this.favoritesCount = favs.length;
    });
  }
}
