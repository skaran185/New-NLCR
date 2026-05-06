
import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { LookupType, LookupValue } from '../../lookup.model';
import { LookupsService } from '../../services/lookups';

@Component({
  selector: 'app-lookup-values-panel',
  standalone: false,
  templateUrl: './lookup-values-panel.html',
  styleUrl: './lookup-values-panel.scss',
})
export class LookupValuesPanelComponent {
  @Input() selectedType: LookupType | null = null;
  @Input() values: LookupValue[] = [];
  @Input() loading = false;
  @Output() addValue = new EventEmitter<void>();
  @Output() editValue = new EventEmitter<LookupValue>();
  @Output() deleteValue = new EventEmitter<LookupValue>();
  @Output() viewValue = new EventEmitter<LookupValue>();
  @Output() refresh = new EventEmitter<void>();

  searchTerm = '';
  filteredValues: LookupValue[] = [];
  viewMode: 'grid' | 'list' = 'grid';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['values']) {
      this.searchTerm = '';
      this.filter();
    }
  }

  filter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredValues = this.values.filter(v =>
      v.name.toLowerCase().includes(term) || v.code.toLowerCase().includes(term)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filter();
  }
}