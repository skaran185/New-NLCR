import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookupsRoutingModule } from './lookups-routing-module';
import { LookupList } from './pages/lookup-list/lookup-list';
import { LookupTypesListComponent } from './components/lookup-types-list/lookup-types-list';
import { LookupValueCardComponent } from './components/lookup-value-card/lookup-value-card';
// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LookupValuesPanelComponent } from './components/lookup-values-panel/lookup-values-panel';
import { LookupDialogComponent } from './components/lookup-dialog/lookup-dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [
    LookupList,
    LookupTypesListComponent,
    LookupValueCardComponent,
    LookupValuesPanelComponent,
    LookupDialogComponent
  ],
  imports: [CommonModule, LookupsRoutingModule,

    // Material
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,

    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
})
export class LookupsModule { }
