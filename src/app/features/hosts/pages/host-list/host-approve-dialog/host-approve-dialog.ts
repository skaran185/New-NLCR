import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Host, LookupItem } from '../../../host.model';
import { HostsService } from '../../../services/hosts';
import { ToastrService } from 'ngx-toastr';

export interface HostActionDialogData {
  host: Host;
}

@Component({
  selector: 'app-host-approve-dialog',
  standalone: false,
  templateUrl: './host-approve-dialog.html',
  styleUrl: './host-approve-dialog.scss',
})
export class HostApproveDialogComponent implements OnInit {

  statuses: LookupItem[] = [];
  selectedStatusId: string | null = null;

  loading = false;
  submitting = false;
  remarks: string = '';

  constructor(
    public dialogRef: MatDialogRef<HostApproveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HostActionDialogData,
    private svc: HostsService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef   // 👈 inject this
  ) { }

  ngOnInit(): void {
    this.loadStatuses();
  }

  loadStatuses() {
    this.loading = true;

    this.svc.getApprovalStatusLookup().subscribe({
      next: res => {
        const currentStatusId = this.data.host.approvalStatusId;

        this.statuses = (res.data || []).filter(
          s => s.id !== currentStatusId
        );

        this.selectedStatusId = this.statuses.length > 0
          ? this.statuses[0].id
          : null;

        this.loading = false;
        this.cdr.detectChanges(); // 👈 force UI update
      },
      error: () => {
        this.toastr.error('Failed to load statuses');
        this.loading = false;
        this.cdr.detectChanges(); // 👈 also here
      }
    });
  }

 confirm() {
  if (!this.selectedStatusId) return;

  this.submitting = true;

  this.svc.updateApprovalStatus(
    this.data.host.id,
    this.selectedStatusId,
    this.remarks        // 👈 pass remarks
  ).subscribe({
    next: () => {
      this.toastr.success('Status updated successfully');
      this.dialogRef.close(true);
    },
    error: () => {
      this.toastr.error('Failed to update status');
      this.submitting = false;
      this.cdr.detectChanges();
    }
  });
}
}