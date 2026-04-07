/**
 * Showcase — ds-ui-angular
 * Drop this component into any Angular app to preview all components.
 *
 * Usage in AppComponent:
 *   imports: [ShowcaseComponent]
 *   template: `<ds-showcase />`
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonComponent }     from '../src/lib/button/button.component';
import { CheckboxComponent }   from '../src/lib/checkbox/checkbox.component';
import { TagComponent }        from '../src/lib/tag/tag.component';
import { ProgressComponent }   from '../src/lib/progress/progress.component';
import { ToastComponent }      from '../src/lib/toast/toast.component';
import { AlertComponent }      from '../src/lib/alert/alert.component';
import { PaginationComponent } from '../src/lib/pagination/pagination.component';
import { CardComponent }       from '../src/lib/card/card.component';

@Component({
  selector: 'ds-showcase',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, FormsModule,
    ButtonComponent, CheckboxComponent, TagComponent,
    ProgressComponent, ToastComponent, AlertComponent,
    PaginationComponent, CardComponent,
  ],
  template: `
    <div class="sc">
      <header class="sc__header">
        <h1>DS-UI Angular — Component Showcase</h1>
        <p>Design System sourced from Figma: <em>Design System Dashboard</em></p>
      </header>

      <!-- ── BUTTONS ─────────────────────────────────── -->
      <section class="sc__section">
        <h2 class="sc__title">Button</h2>
        <div class="sc__row">
          <ds-button variant="primary">Primary</ds-button>
          <ds-button variant="secondary">Secondary</ds-button>
          <ds-button variant="ghost">Ghost</ds-button>
          <ds-button variant="danger">Danger</ds-button>
          <ds-button variant="link">Link</ds-button>
        </div>
        <div class="sc__row">
          <ds-button variant="primary" size="sm">Small</ds-button>
          <ds-button variant="primary" size="md">Medium</ds-button>
          <ds-button variant="primary" size="lg">Large</ds-button>
        </div>
        <div class="sc__row">
          <ds-button variant="primary" [loading]="true">Loading</ds-button>
          <ds-button variant="primary" [disabled]="true">Disabled</ds-button>
        </div>
      </section>

      <!-- ── CHECKBOXES ──────────────────────────────── -->
      <section class="sc__section">
        <h2 class="sc__title">Checkbox</h2>
        <div class="sc__col">
          <ds-checkbox [(checked)]="cb1" label="Checked" description="Supporting text goes here"></ds-checkbox>
          <ds-checkbox [(checked)]="cb2" label="Unchecked"></ds-checkbox>
          <ds-checkbox [(checked)]="cb3" [indeterminate]="true" label="Indeterminate"></ds-checkbox>
          <ds-checkbox [(checked)]="cb4" [disabled]="true" label="Disabled"></ds-checkbox>
        </div>
      </section>

      <!-- ── TAGS ────────────────────────────────────── -->
      <section class="sc__section">
        <h2 class="sc__title">Tag / Badge</h2>
        <div class="sc__row">
          <ds-tag label="Primary"   color="primary"  icon="country" [dismissible]="true"></ds-tag>
          <ds-tag label="Error"     color="error"    icon="x"       [dismissible]="true"></ds-tag>
          <ds-tag label="Success"   color="success"  icon="dot"></ds-tag>
          <ds-tag label="Purple"    color="purple"   icon="icon-left"></ds-tag>
          <ds-tag label="Blue Gray" color="blue-gray" icon="avatar"></ds-tag>
          <ds-tag label="Warning"   color="warning"  icon="dot"></ds-tag>
        </div>
        <div class="sc__row">
          <ds-tag label="Small"  size="sm" color="primary"></ds-tag>
          <ds-tag label="Medium" size="md" color="success"></ds-tag>
          <ds-tag label="Large"  size="lg" color="error"></ds-tag>
        </div>
      </section>

      <!-- ── PROGRESS ────────────────────────────────── -->
      <section class="sc__section">
        <h2 class="sc__title">Progress</h2>
        <div class="sc__col" style="max-width:400px">
          <ds-progress type="linear"  [value]="75"  label="Upload"    [showLabel]="true"></ds-progress>
          <ds-progress type="linear"  [value]="40"  label="Downloads" [showLabel]="true" [showTooltip]="false"></ds-progress>
          <ds-progress type="linear"  [value]="100" label="Complete"  [showLabel]="true"></ds-progress>
        </div>
        <div class="sc__row" style="align-items:flex-end">
          <ds-progress type="circular" [value]="40"  label="Users"></ds-progress>
          <ds-progress type="circular" [value]="72"  label="Sales"></ds-progress>
          <ds-progress type="circular" [value]="95"  label="Done"></ds-progress>
        </div>
      </section>

      <!-- ── TOAST ───────────────────────────────────── -->
      <section class="sc__section">
        <h2 class="sc__title">Toast</h2>
        <div class="sc__col" style="max-width:480px">
          <ds-toast type="informative" title="Toast Title"
                    message="Write your message here"
                    actionLabel="Action"
                    [dismissible]="true"></ds-toast>
          <ds-toast type="success" title="Success"
                    message="Your changes have been saved."
                    [dismissible]="true"></ds-toast>
          <ds-toast type="warning" title="Warning"
                    message="Please review before proceeding."
                    [dismissible]="true"></ds-toast>
          <ds-toast type="error" title="Error"
                    message="Something went wrong. Try again."
                    [dismissible]="true"></ds-toast>
        </div>
      </section>

      <!-- ── ALERTS ──────────────────────────────────── -->
      <section class="sc__section">
        <h2 class="sc__title">Alert</h2>
        <div class="sc__col" style="max-width:500px">
          <ds-alert variant="info"    title="Information"
                    message="Here is some helpful information for you."
                    primaryAction="Learn more" secondaryAction="Dismiss"></ds-alert>
          <ds-alert variant="success" title="Action Completed"
                    message="Your profile was updated successfully."></ds-alert>
          <ds-alert variant="warning" title="Attention Required"
                    message="Your session will expire in 5 minutes."
                    primaryAction="Stay logged in"></ds-alert>
          <ds-alert variant="error"   title="Access Denied"
                    message="You don't have permission to perform this action."></ds-alert>
        </div>
      </section>

      <!-- ── PAGINATION ──────────────────────────────── -->
      <section class="sc__section">
        <h2 class="sc__title">Pagination</h2>
        <ds-pagination
          [totalItems]="100"
          [currentPage]="currentPage"
          [pageSize]="pageSize"
          [pageSizeOptions]="[5,10,20,50]"
          (pageChange)="onPageChange($event)">
        </ds-pagination>
        <p class="sc__note">Page {{ currentPage }} — {{ pageSize }} per page</p>
      </section>

      <!-- ── CARD ────────────────────────────────────── -->
      <section class="sc__section">
        <h2 class="sc__title">Card</h2>
        <div class="sc__row sc__row--cards">
          <!-- Basic card -->
          <ds-card title="Analytics Overview" subtitle="Last 30 days" [width]="280">
            <p style="font-size:13px;color:#667085;line-height:1.5">
              Track your key metrics in one place. Identify trends and make data-driven decisions.
            </p>
          </ds-card>

          <!-- Card with accent + footer CTA -->
          <ds-card title="Upgrade Plan" subtitle="Get more features"
                   accentColor="#6941c6" [hasFooter]="true" [width]="280">
            <p style="font-size:13px;color:#667085;line-height:1.5">
              Unlock advanced reporting, priority support, and unlimited team members.
            </p>
            <ng-container slot="footer">
              <ds-button variant="primary" [block]="true">Upgrade Now</ds-button>
            </ng-container>
          </ds-card>

          <!-- Card with media + footer -->
          <ds-card title="Team Overview" subtitle="12 members"
                   [hasMedia]="true" [hasFooter]="true" [width]="280">
            <ng-container slot="media">
              <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
                <circle cx="30" cy="28" r="14" fill="#e9d7fe"/>
                <circle cx="50" cy="28" r="14" fill="#d1fae5"/>
                <text x="22" y="33" font-size="14" fill="#6941c6">👥</text>
              </svg>
            </ng-container>
            <p style="font-size:13px;color:#667085">Manage your team members and their permissions.</p>
            <ng-container slot="footer">
              <ds-button variant="secondary" [block]="true">View Team</ds-button>
            </ng-container>
          </ds-card>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .sc {
      font-family: 'Inter', -apple-system, sans-serif;
      background:  #f1f2f4;
      min-height:  100vh;
      padding:     32px;
    }
    .sc__header {
      margin-bottom: 40px;
      h1 { font-size: 24px; font-weight: 700; color: #29294c; margin: 0 0 4px; }
      p  { font-size: 14px; color: #707087; margin: 0; }
    }
    .sc__section {
      background:    #fff;
      border-radius: 12px;
      padding:       28px;
      margin-bottom: 24px;
      box-shadow:    0 1px 3px rgba(16,24,40,.08);
    }
    .sc__title {
      font-size:     16px;
      font-weight:   600;
      color:         #29294c;
      margin:        0 0 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid #f2f4f7;
    }
    .sc__row {
      display:     flex;
      align-items: center;
      gap:         12px;
      flex-wrap:   wrap;
      margin-bottom: 12px;
      &:last-child { margin-bottom: 0; }
      &--cards { align-items: flex-start; }
    }
    .sc__col {
      display:        flex;
      flex-direction: column;
      gap:            12px;
    }
    .sc__note {
      font-size:   12px;
      color:       #667085;
      margin:      8px 0 0;
    }
  `],
})
export class ShowcaseComponent {
  cb1 = true;
  cb2 = false;
  cb3 = false;
  cb4 = true;

  currentPage = 1;
  pageSize    = 10;

  onPageChange(e: { page: number; pageSize: number }): void {
    this.currentPage = e.page;
    this.pageSize    = e.pageSize;
  }
}
