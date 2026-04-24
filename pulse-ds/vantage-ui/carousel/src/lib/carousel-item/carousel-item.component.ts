import { Component, TemplateRef, ViewChild } from '@angular/core';


@Component({
    selector: 'vc-carousel-item',
    standalone: true,
    imports: [],
    templateUrl: './carousel-item.component.html',
    styleUrl: './carousel-item.component.scss'
})
export class VcCarouselItem {
  @ViewChild('carouselItemTemplate') template!: TemplateRef<any>;

  getCarouselItemStyle(columns: number, columnGap: number) {
    const defaultMargin = columns > 1 ? 8 : 0;
    const horizontalMargin = columnGap / 2 || defaultMargin;
    return {
      margin: `${defaultMargin}px ${horizontalMargin}px`,
    };
  }
}
