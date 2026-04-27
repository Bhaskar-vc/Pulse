import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SkeletonLoaderComponent } from '@components/skeleton-loader/skeleton-loader';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, SkeletonLoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent implements AfterViewInit {
  showSkeleton = true;

  ngAfterViewInit() {
    setTimeout(() => {
      this.showSkeleton = false;
      document.body.classList.add('page-loaded');
    }, 1600);
  }
}
