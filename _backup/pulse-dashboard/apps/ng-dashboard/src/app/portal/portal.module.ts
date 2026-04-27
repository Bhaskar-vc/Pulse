import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';

// These modules will be created under @components/ when those libraries are set up.
// For now we import the standalone components directly so the build works.
import { TopNavComponent } from '@components/top-nav/top-nav';
import { LeftNavComponent } from '@components/left-nav/left-nav';
import { SkeletonLoaderComponent } from '@components/skeleton-loader/skeleton-loader';

@NgModule({
  declarations: [PortalComponent],
  imports: [
    CommonModule,
    PortalRoutingModule,
    // Standalone components can be imported directly into NgModule imports
    TopNavComponent,
    LeftNavComponent,
    SkeletonLoaderComponent,
  ],
})
export class PortalModule {}
