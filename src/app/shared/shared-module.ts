import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from './components/button/button';
import { Badge } from './components/badge/badge';
import { ConfirmDialog } from './components/confirm-dialog/confirm-dialog';
import { DataTable } from './components/data-table/data-table';
import { PageHeader } from './components/page-header/page-header';
import { StatusLabelPipe } from './pipes/status-label-pipe';
import { CurrencyInrPipe } from './pipes/currency-inr-pipe';
import { HasPermission } from './directives/has-permission';

@NgModule({
  declarations: [
    Button,
    Badge,
    ConfirmDialog,
    DataTable,
    PageHeader,
    StatusLabelPipe,
    CurrencyInrPipe,
    HasPermission,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
