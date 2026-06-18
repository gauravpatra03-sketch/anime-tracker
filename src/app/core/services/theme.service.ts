import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  isDarkMode = false;

  constructor() {
    const savedTheme =
      localStorage.getItem('theme');

    this.isDarkMode =
      savedTheme === 'dark';

    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkMode =
      !this.isDarkMode;

    localStorage.setItem(
      'theme',
      this.isDarkMode
        ? 'dark'
        : 'light'
    );

    this.applyTheme();
  }

  applyTheme() {

    if (this.isDarkMode) {
      document.body.classList.add(
        'dark-theme'
      );
    }
    else {
      document.body.classList.remove(
        'dark-theme'
      );
    }
  }

}
