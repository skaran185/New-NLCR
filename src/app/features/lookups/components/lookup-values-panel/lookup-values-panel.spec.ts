import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupValuesPanel } from './lookup-values-panel';

describe('LookupValuesPanel', () => {
  let component: LookupValuesPanel;
  let fixture: ComponentFixture<LookupValuesPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LookupValuesPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(LookupValuesPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
