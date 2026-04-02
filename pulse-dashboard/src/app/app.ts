import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNavComponent } from './shared/top-nav/top-nav';
import { LeftNavComponent } from './shared/left-nav/left-nav';
import { SkeletonLoaderComponent } from './shared/skeleton-loader/skeleton-loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopNavComponent, LeftNavComponent, SkeletonLoaderComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  navOpen = false;
  showSkeleton = true;

  constructor(private cdr: ChangeDetectorRef) {}

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.showSkeleton = false;
      document.body.classList.add('page-loaded');
      this.cdr.detectChanges();
    }, 1600);
  }
}
