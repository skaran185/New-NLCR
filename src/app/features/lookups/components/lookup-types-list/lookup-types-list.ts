import { Component, Input, Output, EventEmitter, SimpleChange, SimpleChanges } from '@angular/core';
import { LookupType } from '../../lookup.model';
import { LookupsService } from '../../services/lookups';

@Component({
  selector: 'app-lookup-types-list',
  standalone: false,
  templateUrl: './lookup-types-list.html',
  styleUrl: './lookup-types-list.scss',
})
export class LookupTypesListComponent {
  @Input() types: LookupType[] = [];
  @Input() loading = false;
  @Input() selectedTypeCode: string | null = null;
  @Output() typeSelected = new EventEmitter<LookupType>();

  searchTerm: string = '';
  filteredTypes: LookupType[] = [];

  ngOnInit(): void {
    this.filteredTypes = this.types;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['types']) {
      this.filter();
    }
  }

  filter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredTypes = this.types.filter(t =>
      t.name.toLowerCase().includes(term) || t.code.toLowerCase().includes(term)
    );
  }

  select(type: LookupType): void {
    this.typeSelected.emit(type);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filter();
  }
}
