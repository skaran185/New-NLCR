import { Component } from '@angular/core';
import { LookupType, LookupValue } from '../../lookup.model';
import { LookupsService } from '../../services/lookups';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LookupDialogComponent } from '../../components/lookup-dialog/lookup-dialog';

@Component({
  selector: 'app-lookup-list',
  standalone: false,
  templateUrl: './lookup-list.html',
  styleUrl: './lookup-list.scss',
})
export class LookupList {

  types: LookupType[] = [];
  values: LookupValue[] = [];
  selectedType: LookupType | null = null;
  typesLoading = false;
  valuesLoading = false;

  constructor(
    private lookupsService: LookupsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTypes();
  }

  loadTypes(): void {
    this.typesLoading = true;
    this.lookupsService.getTypes().subscribe({
      next: (res: any) => {
        this.types = res.data;
        this.typesLoading = false;
      },
      error: () => {
        this.typesLoading = false;
        this.snackBar.open('Failed to load lookup types.', 'Close', { duration: 3000 });
      }
    });
  }

  onTypeSelected(type: LookupType): void {
    this.selectedType = type;
    this.loadValues(type.code);
  }

  loadValues(code: string): void {
    this.valuesLoading = true;
    this.values = [];
    this.lookupsService.getValues(code).subscribe({
      next: (res: any) => {
        this.values = res.data;
        this.valuesLoading = false;
      },
      error: () => {
        this.valuesLoading = false;
        this.snackBar.open('Failed to load lookup values.', 'Close', { duration: 3000 });
      }
    });
  }

  openDialog(data: any): void {
    const ref = this.dialog.open(LookupDialogComponent, {
      data,
      width: 'min(480px, 95vw)',
      panelClass: 'lookup-dialog-panel'
    });
    ref.afterClosed().subscribe(result => {
      if (result) {
        const action = data.mode === 'add' ? 'added' : data.mode === 'edit' ? 'updated' : 'deleted';
        this.snackBar.open(`Value ${action} successfully.`, 'Close', { duration: 3000 });
        // Re-fetch after mutation
        if (this.selectedType) this.loadValues(this.selectedType.code);
      }
    });
  }

  onAddValue(): void {
    this.openDialog({ mode: 'add', typeName: this.selectedType?.name });
  }

  onEditValue(value: LookupValue): void {
    this.openDialog({ mode: 'edit', value, typeName: this.selectedType?.name });
  }

  onDeleteValue(value: LookupValue): void {
    this.openDialog({ mode: 'delete', value, typeName: this.selectedType?.name });
  }

  onViewValue(value: LookupValue): void {
    this.openDialog({ mode: 'view', value, typeName: this.selectedType?.name });
  }

  onRefresh(): void {
    if (this.selectedType) this.loadValues(this.selectedType.code);
  }

}
