

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Host, HostsFilter, Pagination } from '../../host.model';
import { HostsService } from '../../services/hosts';
import { HostViewDialogComponent } from './host-view-dialog/host-view-dialog';
import { HostApproveDialogComponent } from './host-approve-dialog/host-approve-dialog';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-host-list',
  standalone: false,
  templateUrl: './host-list.html',
  styleUrl: './host-list.scss',
})
export class HostsListComponent implements OnInit {
  hosts: Host[] = [];
  pagination!: Pagination;
  loading = false;

  searchTerm = '';
  private searchSubject = new Subject<string>();

  columns = ['fullName', 'businessName', 'approvalStatus', 'idProofStatus', 'completion', 'createdAt', 'actions'];

  filter: HostsFilter = {
    approvalStatus: 'ALL',
    idProofStatus: 'ALL',
    sortBy: 'NEWEST',
    pageNumber: 1,
    pageSize: 10,
  };

  approvalOptions = ['ALL', 'PENDING', 'APPROVED', 'REJECTED'];
  idProofOptions = ['ALL', 'PENDING', 'APPROVED', 'REJECTED'];
  sortOptions = [
    { value: 'NEWEST', label: 'Newest' },
    { value: 'OLDEST', label: 'Oldest' },
  ];

  constructor(
    private svc: HostsService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.load();

    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(term => {
      this.filter.search = term;
      this.filter.pageNumber = 1;
      this.load();
    });
  }

  onSearchChange(term: string) {
    this.searchSubject.next(term);
  }

  load() {
    this.loading = true;
    this.svc.getHosts(this.filter).subscribe({
      next: res => {
        this.hosts = res.data;
        this.pagination = res.pagination;
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Failed to load hosts');
        this.loading = false;
      }
    });
  }

  onFilterChange() {
    this.filter.pageNumber = 1;
    this.load();
  }

  onPageChange(event: any) {
    this.filter.pageNumber = event.pageIndex + 1;
    this.filter.pageSize = event.pageSize;
    this.load();
  }

  openView(host: Host) {
    const isMobile = window.innerWidth < 768;

    this.dialog.open(HostViewDialogComponent, {
      width: isMobile ? '100vw' : '720px',
      height: isMobile ? '100vh' : undefined,
      maxWidth: '95vw',
      panelClass: isMobile ? 'fullscreen-dialog' : 'host-view-dialog',
      ...(isMobile && {
        position: { top: '0' }
      }),
      data: host
    });
  }
onImgError(event: any) {
  event.target.style.display = 'none';
}
  openAction(host: Host) {
    this.dialog.open(HostApproveDialogComponent, {
      width: '420px',
      data: { host },
      panelClass: 'nexo-dialog'
    }).afterClosed().subscribe(updated => {
      if (updated) {
        this.toastr.success('Status updated successfully');
        this.load();
      }
    });
  }
}
