import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent implements AfterViewInit {
  showSkeleton = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.showSkeleton = false;
      document.body.classList.add('page-loaded');
      this.cdr.detectChanges();
    }, 1600);
  }
}
