import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PulseRoutingModule } from './pulse-routing.module';
import { PulseComponent } from './pulse.component';

@NgModule({
  declarations: [PulseComponent],
  imports: [CommonModule, PulseRoutingModule],
})
export class PulseModule {}
