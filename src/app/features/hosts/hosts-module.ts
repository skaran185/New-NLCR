import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { HostsRoutingModule } from './hosts-routing-module';
import { HostsListComponent } from './pages/host-list/host-list';
import { HostDetailComponent } from './pages/host-detail/host-detail';
import { HostApproveDialogComponent } from './pages/host-list/host-approve-dialog/host-approve-dialog';
import { HostViewDialogComponent } from './pages/host-list/host-view-dialog/host-view-dialog';

@NgModule({
  declarations: [
    HostsListComponent,
    HostDetailComponent,
    HostApproveDialogComponent,
    HostViewDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HostsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatDividerModule,
    MatCardModule,
    MatChipsModule,
  ]
})
export class HostsModule {}