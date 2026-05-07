import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-id-proof-viewer-sheet.component',
  standalone: false,
  templateUrl: './id-proof-viewer-sheet.component.html',
  styleUrl: './id-proof-viewer-sheet.component.scss',
})
export class IdProofViewerSheetComponent {

  loading = true;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private sheetRef: MatBottomSheetRef<IdProofViewerSheetComponent>
  ) { }

  ngOnInit(): void {
    // simulate ready state until media loads
  }

  onLoad() {
    this.loading = false;
  }

  close() {
    this.sheetRef.dismiss();
  }

  isImage(): boolean {
    return this.data?.url?.match(/\.(jpg|jpeg|png|webp)/i);
  }

  isPdf(): boolean {
    return this.data?.url?.includes('.pdf');
  }
}
