import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {

  @Input()
  watchedEpisodes = 0;

  @Input()
  totalEpisodes = 0;

  get progressPercentage(): number {

    if (!this.totalEpisodes) {
      return 0;
    }

    return Math.round(
      (this.watchedEpisodes / this.totalEpisodes)
      * 100
    );
  }

  getPercentage() {
    return Math.round(
      (this.watchedEpisodes /
        this.totalEpisodes) * 100
    );
  }
}
