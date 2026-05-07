import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LookupValue } from '../../lookup.model';

export interface LookupDialogData {
  mode: 'add' | 'edit' | 'view' | 'delete';  // which dialog variant to show
  value?: LookupValue;                         // the lookup value being acted on (optional for 'add')
  typeName?: string;                           // parent type name shown in the dialog header
}

@Component({
  selector: 'app-lookup-dialog',
  standalone: false,
  templateUrl: './lookup-dialog.html',
  styleUrl: './lookup-dialog.scss',
})
export class LookupDialogComponent {
  form: FormGroup;
  mode: LookupDialogData['mode'];
  modeTitle: string;
  modeIcon: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LookupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LookupDialogData
  ) {
    this.mode = data.mode;
    const modeMap = {
      add: { title: 'Add Lookup Value', icon: 'add_circle' },
      edit: { title: 'Edit Lookup Value', icon: 'edit' },
      view: { title: 'View Lookup Value', icon: 'visibility' },
      delete: { title: 'Delete Lookup Value', icon: 'delete' }
    };
    this.modeTitle = modeMap[this.mode].title;
    this.modeIcon = modeMap[this.mode].icon;

    this.form = this.fb.group({
      name: [data.value?.name || '', Validators.required],
      code: [{ value: data.value?.code || '', disabled: this.mode === 'edit' },
      [Validators.required, Validators.pattern(/^[A-Z_]+$/)]]
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }
}
