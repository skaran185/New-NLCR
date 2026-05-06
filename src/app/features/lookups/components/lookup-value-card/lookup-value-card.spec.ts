import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupValueCard } from './lookup-value-card';

describe('LookupValueCard', () => {
  let component: LookupValueCard;
  let fixture: ComponentFixture<LookupValueCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LookupValueCard],
    }).compileComponents();

    fixture = TestBed.createComponent(LookupValueCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
