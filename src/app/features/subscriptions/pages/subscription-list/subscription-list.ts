import { Component } from '@angular/core';
import { SubscriptionPlan, SubscriptionsService } from '../../services/subscriptions';

@Component({
  selector: 'app-subscription-list',
  standalone: false,
  templateUrl: './subscription-list.html',
  styleUrl: './subscription-list.scss',
})
export class SubscriptionList {
  
  subscriptionPlans: SubscriptionPlan[] = [];
  filteredPlans: SubscriptionPlan[] = [];
 
  isLoading = false;
  hasError = false;
 
  searchTerm = '';
  activeFilter: 'all' | 'active' | 'inactive' | 'free' | 'paid' = 'all';
 
  currentPage = 1;
  pageSize = 10;
 
  private sortField: keyof SubscriptionPlan | '' = '';
  private sortAsc = true;
 
  constructor(private subscriptionsService: SubscriptionsService) {}
 
  ngOnInit(): void {
    this.loadPlans();
  }
 
  loadPlans(): void {
    this.isLoading = true;
    this.hasError = false;
 
    this.subscriptionsService.getHostSubscriptionPackages().subscribe({
      next: (response:any) => {
        if (response.success && response.data) {
          this.subscriptionPlans = response.data;
          this.applyFilters();
        }
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
 
  onRefresh(): void {
    this.loadPlans();
  }
 
  onAddNew(): void {
    // TODO: Navigate to add plan form or open modal
    console.log('Navigate to add plan');
  }
 
  onView(plan: SubscriptionPlan): void {
    // TODO: Navigate to plan detail or open detail drawer
    console.log('View plan:', plan.id);
  }
 
  onEdit(plan: SubscriptionPlan): void {
    // TODO: Navigate to edit form or open edit modal
    console.log('Edit plan:', plan.id);
  }
 
  onDelete(plan: SubscriptionPlan): void {
    // TODO: Open confirmation dialog, then call delete API
    if (confirm(`Are you sure you want to delete "${plan.planName}"?`)) {
      console.log('Delete plan:', plan.id);
      // this.subscriptionsService.deletePlan(plan.id).subscribe(...)
    }
  }
 
  toggleStatus(plan: SubscriptionPlan): void {
    const originalStatus = plan.isPurchasable;
    plan.isPurchasable = !plan.isPurchasable;
 
    // TODO: Call update API
    // this.subscriptionsService.updatePlan(plan.id, { isPurchasable: plan.isPurchasable }).subscribe({
    //   error: () => { plan.isPurchasable = originalStatus; }
    // });
    console.log(`Plan "${plan.planName}" status toggled to: ${plan.isPurchasable}`);
  }
 
  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }
 
  setFilter(filter: typeof this.activeFilter): void {
    this.activeFilter = filter;
    this.currentPage = 1;
    this.applyFilters();
  }
 
  sortBy(field: keyof SubscriptionPlan): void {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }
    this.applyFilters();
  }
 
  private applyFilters(): void {
    let result = [...this.subscriptionPlans];
 
    // Search
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(p =>
        p.planName.toLowerCase().includes(term) ||
        p.planCode.toLowerCase().includes(term)
      );
    }
 
    // Filter
    switch (this.activeFilter) {
      case 'active':
        result = result.filter(p => p.isPurchasable);
        break;
      case 'inactive':
        result = result.filter(p => !p.isPurchasable);
        break;
      case 'free':
        result = result.filter(p => p.isFree);
        break;
      case 'paid':
        result = result.filter(p => !p.isFree);
        break;
    }
 
    // Sort
    if (this.sortField) {
      const field = this.sortField;
      result.sort((a, b) => {
        const valA = a[field] ?? 0;
        const valB = b[field] ?? 0;
        if (valA < valB) return this.sortAsc ? -1 : 1;
        if (valA > valB) return this.sortAsc ? 1 : -1;
        return 0;
      });
    }
 
    this.filteredPlans = result;
  }
 
  // Summary counts
  getActivePlansCount(): number {
    return this.subscriptionPlans.filter(p => p.isPurchasable).length;
  }
 
  getFreePlansCount(): number {
    return this.subscriptionPlans.filter(p => p.isFree).length;
  }
 
  getPaidPlansCount(): number {
    return this.subscriptionPlans.filter(p => !p.isFree).length;
  }
 
  onPageChange(page: number): void {
    this.currentPage = page;
    // TODO: implement pagination when API supports it
  }
}
