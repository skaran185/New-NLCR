import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AdminVehicleService } from '../../../services/vehicles';

export interface VehicleImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
  displayOrder: number;
  isApproved: boolean;
  filename?: string;
}

export interface ImageReviewDialogData {
  vehicleId: string;
  vehicleName?: string;
}

@Component({
  selector: 'app-image-review-dialog',
  standalone: false,
  templateUrl: './image-review-dialog.component.html',
  styleUrl: './image-review-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ImageReviewDialogComponent implements OnInit {
  images$!: Observable<VehicleImage[]>;

  approvedIds = new Set<string>();
  rejectedIds = new Set<string>();
  lightboxImage: VehicleImage | null = null;
  isSubmitting = false;
  hasError = false;

  private imagesSnapshot: VehicleImage[] = [];

  get vehicleId(): string { return this.data.vehicleId; }
  get approvedCount(): number { return this.approvedIds.size; }
  get rejectedCount(): number { return this.rejectedIds.size; }
  get totalCount(): number { return this.imagesSnapshot.length; }
  get pendingCount(): number {
    return this.imagesSnapshot.filter(img => this.getStatus(img.id) === 'pending').length;
  }
  get allReviewed(): boolean {
    return this.imagesSnapshot.length > 0 && this.pendingCount === 0;
  }

  constructor(
    private vehicleService: AdminVehicleService,
    private dialogRef: MatDialogRef<ImageReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageReviewDialogData
  ) {}

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.hasError = false;
    this.images$ = this.vehicleService.getVehicleImages(this.vehicleId).pipe(
      map((response: any) => response?.data ?? response ?? []),
      tap((images: VehicleImage[]) => {
        this.imagesSnapshot = images;
        this.approvedIds = new Set(images.filter(i => i.isApproved === true).map(i => i.id));
        this.rejectedIds = new Set(images.filter(i => i.isApproved === false).map(i => i.id));
      })
    );
  }

  getStatus(id: string): 'approved' | 'rejected' | 'pending' {
    if (this.approvedIds.has(id)) return 'approved';
    if (this.rejectedIds.has(id)) return 'rejected';
    return 'pending';
  }

  approve(id: string): void {
    this.approvedIds = new Set([...this.approvedIds, id]);
    this.rejectedIds.delete(id);
    this.rejectedIds = new Set(this.rejectedIds);
  }

  reject(id: string): void {
    this.rejectedIds = new Set([...this.rejectedIds, id]);
    this.approvedIds.delete(id);
    this.approvedIds = new Set(this.approvedIds);
  }

  reset(id: string): void {
    this.approvedIds.delete(id);
    this.rejectedIds.delete(id);
    this.approvedIds = new Set(this.approvedIds);
    this.rejectedIds = new Set(this.rejectedIds);
  }

  approveAll(): void {
    this.approvedIds = new Set(this.imagesSnapshot.map(i => i.id));
    this.rejectedIds = new Set();
  }

  openLightbox(image: VehicleImage): void { this.lightboxImage = image; }
  closeLightbox(): void { this.lightboxImage = null; }
  close(): void { this.dialogRef.close(null); }

  submit(): void {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    const payload = {
      approvedImageIds: Array.from(this.approvedIds),
      rejectedImageIds: Array.from(this.rejectedIds),
    };

    this.vehicleService.reviewVehicleImages(this.vehicleId, payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.dialogRef.close({ success: true, payload });
      },
      error: () => { this.isSubmitting = false; }
    });
  }
}