import { AfterContentChecked, Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: 'table[VcTable]',
  standalone: true,
})
export class VcTableDirective implements AfterContentChecked {
  @Input() striped: boolean = false;
  @Input() headingFontSize: 'default' | 'l' | 'xl' = 'default';
  @Input() headingFontColor: 'default' | 'dark' = 'default';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostBinding('style.width') width: string = '100%';

  ngAfterContentChecked(): void {
    const thead = this.el.nativeElement.querySelector('thead');

    if (thead) {
      if (!this.striped) {
        this.renderer.setStyle(thead, 'background-color', '#F9FAFB');
      }

      this.renderer.setStyle(thead, 'position', 'sticky');
      this.renderer.setStyle(thead, 'top', '0px');

      if (this.headingFontSize === 'l') {
        this.renderer.setStyle(thead, 'font-size', '14px');
      } else if (this.headingFontSize === 'xl') {
        this.renderer.setStyle(thead, 'font-size', '16px');
      } else {
        this.renderer.setStyle(thead, 'font-size', '12px');
      }
      // this.renderer.setStyle(thead, 'font-weight', '500');

      const th = thead.querySelectorAll('th');
      const td = thead.querySelectorAll('td');

      if (th) {
        th.forEach((element: any) => {
          this.renderer.setStyle(element, 'font-weight', '500');
          this.renderer.setStyle(element, 'text-align', 'left');
          this.renderer.setStyle(element, 'padding', '12px 24px');
          this.renderer.setStyle(element, 'border-bottom', '1px #eaecf0 solid');
          this.renderer.setStyle(element, 'line-height', '140%');
          this.renderer.setStyle(element, 'letter-spacing', '0.03px');
          if (this.headingFontColor === 'dark') {
            this.renderer.setStyle(element, 'color', '#29294c'); // text-primary-500
          }
        });
      }

      if (td) {
        td.forEach((element: any) => {
          this.renderer.setStyle(element, 'font-weight', '500');
          this.renderer.setStyle(element, 'padding', '12px 24px');
          this.renderer.setStyle(element, 'border-bottom', '1px #eaecf0 solid');
          this.renderer.setStyle(element, 'line-height', '140%');
          this.renderer.setStyle(element, 'letter-spacing', '0.03px');
        });
      }
    }

    const tbody = this.el.nativeElement.querySelector('tbody');

    if (tbody) {
      const tr = tbody.querySelectorAll('tr');
      const td = tbody.querySelectorAll('td');

      if (tr) {
        tr.forEach((element: any, index: number) => {
          if (this.striped) {
            if (index % 2 === 0) {
              this.renderer.setStyle(element, 'background-color', '#f9fafb');
            }
          }
        });
      }

      if (td) {
        td.forEach((element: any) => {
          this.renderer.setStyle(element, 'padding', '16px 24px');
          this.renderer.setStyle(element, 'border-bottom', '1px #eaecf0 solid');
        });
      }
    }
  }
}
