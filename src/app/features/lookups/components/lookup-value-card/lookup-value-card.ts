


import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LookupValue } from '../../lookup.model';
import { LookupsService } from '../../services/lookups';

@Component({
  selector: 'app-lookup-value-card',
  standalone: false,
  templateUrl: './lookup-value-card.html',
  styleUrl: './lookup-value-card.scss',
})
export class LookupValueCardComponent {
    @Input() value!: LookupValue;
  @Output() edit = new EventEmitter<LookupValue>();
  @Output() delete = new EventEmitter<LookupValue>();
  @Output() view = new EventEmitter<LookupValue>();
}