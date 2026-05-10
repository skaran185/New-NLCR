import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AdminVehicleQuery, AdminVehicleStats, AdminVehicleSummary, PaginationMeta } from '../../models/admin-vehicle.model';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminVehicleService } from '../../services/vehicles';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageReviewDialogComponent } from './image-review-dialog.component/image-review-dialog.component';


export const LISTING_STATUSES = [
  { value: 'ALL', label: 'All statuses' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'DRAFT', label: 'Draft' },
  { value: 'INACTIVE', label: 'Inactive' },
];

export const APPROVAL_STATUSES = [
  { value: 'ALL', label: 'All' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'REJECTED', label: 'Rejected' },
];

export const SORT_OPTIONS = [
  { value: 'NEWEST', label: 'Newest first' },
  { value: 'PENDING_FIRST', label: 'Pending approval first' },
  { value: 'RATING', label: 'Top rated' },
  { value: 'IMAGES', label: 'Images pending first' },
];

export const PAGE_SIZE_OPTIONS = [10, 20, 50];

@Component({
  selector: 'app-vehicle-list',
  standalone: false,
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.scss',
})


export class VehicleList implements OnInit, OnDestroy {
  // ── Data ────────────────────────────────────────────────────────────────────
  vehicles: AdminVehicleSummary[] = [];
  stats: AdminVehicleStats = {
    total: 0,
    pendingApproval: 0,
    active: 0,
    imagesPending: 0,
    draft: 0,
  };
  pagination: PaginationMeta = {
    pageNumber: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0,
  };

  // ── UI state ─────────────────────────────────────────────────────────────────
  isLoading = false;
  approvingId: string | null = null;

  // ── Filter form ───────────────────────────────────────────────────────────────
  filterForm!: FormGroup;

  // ── Table columns ─────────────────────────────────────────────────────────────
  readonly displayedColumns = [
    'vehicle',
    'host',
    'category',
    'status',
    'adminApproval',
    'images',
    'rating',
    'actions',
  ];

  // ── Constants ─────────────────────────────────────────────────────────────────
  readonly listingStatuses = LISTING_STATUSES;
  readonly approvalStatuses = APPROVAL_STATUSES;
  readonly sortOptions = SORT_OPTIONS;
  readonly pageSizeOptions = PAGE_SIZE_OPTIONS;

  // ── Categories ─────────────────────────────────────────────────────────────────
  // Replace with actual API call to /api/vehicles/meta if needed
  readonly categories = [
    { id: 'ALL', name: 'All categories' },
    { id: 'suv-id', name: 'SUV' },
    { id: 'sedan-id', name: 'Sedan' },
    { id: 'sports-id', name: 'Sports' },
    { id: 'convertible-id', name: 'Convertible' },
    { id: 'van-id', name: 'Van' },
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private vehicleService: AdminVehicleService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.listenToSearch();
    this.loadVehicles();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Form ───────────────────────────────────────────────────────────────────────
  private buildForm(): void {
    this.filterForm = this.fb.group({
      search: [''],
      statusFilter: ['ALL'],
      categoryFilter: ['ALL'],
      approvalFilter: ['ALL'],
      sortBy: ['NEWEST'],
    });
  }

  private listenToSearch(): void {
    this.filterForm
      .get('search')!
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.onFilterChange());
  }

  // ── Trigger when any dropdown changes ────────────────────────────────────────
  onFilterChange(): void {
    this.pagination.pageNumber = 1;
    this.loadVehicles();
  }

  resetFilters(): void {
    this.filterForm.reset({
      search: '',
      statusFilter: 'ALL',
      categoryFilter: 'ALL',
      approvalFilter: 'ALL',
      sortBy: 'NEWEST',
    });
    this.pagination.pageNumber = 1;
    this.loadVehicles();
  }

  // ── Data loading ───────────────────────────────────────────────────────────────
  loadVehicles(): void {
    this.isLoading = true;
    const query: AdminVehicleQuery = {
      ...this.filterForm.value,
      pageNumber: this.pagination.pageNumber,
      pageSize: this.pagination.pageSize,
    };

    this.vehicleService
      .getVehicles(query)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.vehicles = res.data.data;
          this.stats = res.data.stats;
          this.pagination = res.pagination;
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.isLoading = false;
          this.showError('Failed to load vehicles. Please try again.');
          this.cdr.markForCheck();
        },
      });
  }

  // ── Pagination ─────────────────────────────────────────────────────────────────
  onPageChange(event: any): void {
    this.pagination.pageNumber = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;
    this.loadVehicles();
  }

  // ── Active filter chips ────────────────────────────────────────────────────────
  get activeFilters(): { label: string; field: string }[] {
    const form = this.filterForm.value;
    const chips: { label: string; field: string }[] = [];
    if (form.search) chips.push({ label: `"${form.search}"`, field: 'search' });
    if (form.statusFilter !== 'ALL')
      chips.push({ label: `Status: ${form.statusFilter}`, field: 'statusFilter' });
    if (form.categoryFilter !== 'ALL')
      chips.push({ label: `Category: ${form.categoryFilter}`, field: 'categoryFilter' });
    if (form.approvalFilter !== 'ALL')
      chips.push({ label: `Approval: ${form.approvalFilter}`, field: 'approvalFilter' });
    return chips;
  }

  removeFilter(field: string): void {
    this.filterForm.patchValue({ [field]: field === 'search' ? '' : 'ALL' });
    this.onFilterChange();
  }

  // ── Actions ────────────────────────────────────────────────────────────────────
  viewVehicle(id: string): void {
    this.router.navigate(['/admin/vehicles', id]);
  }

  openImageApproval(vehicle: AdminVehicleSummary): void {
    debugger
    const dialogRef = this.dialog.open(ImageReviewDialogComponent, {
      width: '960px',
      maxWidth: '95vw',
      height: 'auto',       // ← add this
      maxHeight: '90vh',
  panelClass: 'clean-dialog',  // ← add this
      data: {
        vehicleId: vehicle.id,
        vehicleName: vehicle.licensePlate // optional
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        console.log('Review submitted:', result.payload);
        // refresh your table/list here
      }
    });
    console.log('Open image approval for', vehicle.id);
  }

  toggleApproval(vehicle: AdminVehicleSummary): void {
    const newApproval = vehicle.adminApproval !== 'APPROVED';
    this.approvingId = vehicle.id;
    this.cdr.markForCheck();

    this.vehicleService
      .approveVehicle(vehicle.id, { isApproved: newApproval })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          vehicle.adminApproval = newApproval ? 'APPROVED' : 'PENDING';
          vehicle.isCarApprovedFromAdmin = newApproval;
          this.approvingId = null;
          this.showSuccess(
            newApproval ? 'Vehicle approved successfully.' : 'Vehicle approval revoked.'
          );
          this.cdr.markForCheck();
        },
        error: () => {
          this.approvingId = null;
          this.showError('Failed to update approval. Please try again.');
          this.cdr.markForCheck();
        },
      });
  }

  // ── Helpers ────────────────────────────────────────────────────────────────────
  getHostInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      ACTIVE: 'badge-active',
      DRAFT: 'badge-draft',
      INACTIVE: 'badge-inactive',
    };
    return map[status] ?? 'badge-draft';
  }

  getApprovalClass(approval: string): string {
    const map: Record<string, string> = {
      APPROVED: 'badge-approved',
      PENDING: 'badge-pending',
      REJECTED: 'badge-rejected',
    };
    return map[approval] ?? 'badge-pending';
  }

  get hasActiveFilters(): boolean {
    const f = this.filterForm.value;
    return (
      !!f.search ||
      f.statusFilter !== 'ALL' ||
      f.categoryFilter !== 'ALL' ||
      f.approvalFilter !== 'ALL'
    );
  }

  trackById(_: number, item: AdminVehicleSummary): string {
    return item.id;
  }

  private showSuccess(msg: string): void {
    this.snackBar.open(msg, 'Close', { duration: 3000, panelClass: 'snack-success' });
  }

  private showError(msg: string): void {
    this.snackBar.open(msg, 'Close', { duration: 4000, panelClass: 'snack-error' });
  }
}