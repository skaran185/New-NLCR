import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Host } from '../../../host.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HostsService } from '../../../services/hosts';
import { IdProofViewerSheetComponent } from '../id-proof-viewer-sheet.component/id-proof-viewer-sheet.component';

@Component({
  selector: 'app-host-view-dialog',
  standalone: false,
  templateUrl: './host-view-dialog.html',
  styleUrl: './host-view-dialog.scss',
})
export class HostViewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<HostViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public host: Host,
    private bottomSheet: MatBottomSheet,
    private hostservice: HostsService
  ) { }

  activeTab: 'overview' | 'subscription' | 'billing' | 'completion' = 'overview';
  allSteps: string[] = [
    'Basic Info',
    'Business Info',
    'Profile Image',
    'ID Verification',
    'Contract Signed',
    'Admin Approval',
  ];

  // Compact labels for UI
  shortStepMap: Record<string, string> = {
    'Basic Info': 'Basic',
    'Business Info': 'Business',
    'Profile Image': 'Photo',
    'ID Verification': 'ID',
    'Contract Signed': 'Contract',
    'Admin Approval': 'Approval',
  };

  // Helper (safe fallback)
  getStepLabel(step: string): string {
    return this.shortStepMap[step] || step;
  }

  // Optional: check status (cleaner template)
  isPending(step: string): boolean {
    return this.host?.pendingSteps?.includes(step);
  }

  isCompleted(step: string): boolean {
    return !this.isPending(step);
  }

  openIdProof() {
    if (this.host.idProofDocumentUrl) {
      window.open(this.host.idProofDocumentUrl, '_blank');
    }
  }

  viewDocument(fileUrl: string) {
    this.hostservice.getFileFromUrl(fileUrl).subscribe(actualUrl => {

      this.bottomSheet.open(IdProofViewerSheetComponent, {
        data: {
          url: actualUrl
        },
        panelClass: 'full-bottom-sheet'
      });

    });
  }

  // component .ts
  formatDocType(type: string): string {
    return type.replace(/_/g, ' ').toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase());
  }
}
