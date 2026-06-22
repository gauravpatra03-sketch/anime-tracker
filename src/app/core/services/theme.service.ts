import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  isDarkMode = false;

  constructor() {
    this.isDarkMode =
      localStorage.getItem('theme') === 'dark';

    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    localStorage.setItem(
      'theme',
      this.isDarkMode ? 'dark' : 'light'
    );

    this.applyTheme();
  }

  applyTheme() {
    document.body.classList.toggle(
      'dark-theme',
      this.isDarkMode
    );
  }

  setTheme(value: boolean) {
    this.isDarkMode = value;

    localStorage.setItem(
      'theme',
      value ? 'dark' : 'light'
    );

    this.applyTheme();
  }
}