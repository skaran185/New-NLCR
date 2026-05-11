import { ChangeDetectorRef, Component } from '@angular/core';
import { AdminUserQuery, AdminUserStats, AdminUserSummary } from '../../models/admin.user.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { AdminUserService } from '../../services/users';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  users: AdminUserSummary[] = [];
  stats: AdminUserStats = { total: 0, customers: 0, hosts: 0, suspended: 0, guestSessions: 0 };
  totalRecords = 0;
  pageNumber = 1;
  pageSize = 10;
  isLoading = false;

  filterForm!: FormGroup;

  

  readonly displayedColumns = [
    'user',
    'role',
    'status',
    'country',
    'verification',
    'activity',
    'counts',
  ];

  readonly roleOptions = [
    { value: 'ALL', label: 'All roles' },
    { value: 'CUSTOMER', label: 'Customer' },
    { value: 'HOST', label: 'Host' },
  ];

  readonly statusOptions = [
    { value: 'ALL', label: 'All statuses' },
    { value: 'ACTIVE', label: 'Active' },
    { value: 'SUSPENDED', label: 'Suspended' },
    { value: 'DELETED', label: 'Deleted' },
  ];

  readonly sortOptions = [
    { value: 'NEWEST', label: 'Newest first' },
    { value: 'LAST_LOGIN', label: 'Recently active' },
    { value: 'NAME_ASC', label: 'Name A–Z' },
  ];

  readonly pageSizeOptions = [10, 20, 50];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private userService: AdminUserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      search: [''],
      roleFilter: ['ALL'],
      accountStatusFilter: ['ALL'],
      sortBy: ['NEWEST'],
    });

    this.filterForm
      .get('search')!
      .valueChanges.pipe(debounceTime(400), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.onFilterChange());

    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFilterChange(): void {
    this.pageNumber = 1;
    this.loadUsers();
  }

  resetFilters(): void {
    this.filterForm.reset({ search: '', roleFilter: 'ALL', accountStatusFilter: 'ALL', sortBy: 'NEWEST' });
    this.pageNumber = 1;
    this.loadUsers();
  }

  onPageChange(event: any): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  get sortByControl(): FormControl {
    return this.filterForm.get('sortBy') as FormControl;
  }

  loadUsers(): void {
    this.isLoading = true;
    const query: AdminUserQuery = {
      ...this.filterForm.value,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };

    this.userService
      .getUsers(query)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.users = res.data.data;
          this.stats = res.data.stats;
          this.totalRecords = res.data.totalRecords;
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.isLoading = false;
          this.cdr.markForCheck();
        },
      });
  }

  get activeFilters(): { label: string; field: string }[] {
    const f = this.filterForm.value;
    const chips: { label: string; field: string }[] = [];
    if (f.search) chips.push({ label: `"${f.search}"`, field: 'search' });
    if (f.roleFilter !== 'ALL') chips.push({ label: `Role: ${f.roleFilter}`, field: 'roleFilter' });
    if (f.accountStatusFilter !== 'ALL') chips.push({ label: `Status: ${f.accountStatusFilter}`, field: 'accountStatusFilter' });
    return chips;
  }

  removeFilter(field: string): void {
    this.filterForm.patchValue({ [field]: field === 'search' ? '' : 'ALL' });
    this.onFilterChange();
  }

  get hasActiveFilters(): boolean {
    const f = this.filterForm.value;
    return !!f.search || f.roleFilter !== 'ALL' || f.accountStatusFilter !== 'ALL';
  }

  getInitials(name: string | null): string {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  }

  getRoleClass(role: string): string {
    return role === 'HOST' ? 'badge-host' : 'badge-customer';
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      ACTIVE: 'badge-active',
      SUSPENDED: 'badge-suspended',
      INACTIVE: 'badge-inactive',
    };
    return map[status] ?? 'badge-inactive';
  }

  trackById(_: number, item: AdminUserSummary): string {
    return item.id;
  }
}
