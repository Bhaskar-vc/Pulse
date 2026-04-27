import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports';

@NgModule({
  declarations: [ReportsComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, ReportsRoutingModule],
})
export class ReportsModule {}
