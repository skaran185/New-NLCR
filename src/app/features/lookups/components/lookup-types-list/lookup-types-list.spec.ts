import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupTypesList } from './lookup-types-list';

describe('LookupTypesList', () => {
  let component: LookupTypesList;
  let fixture: ComponentFixture<LookupTypesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LookupTypesList],
    }).compileComponents();

    fixture = TestBed.createComponent(LookupTypesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
