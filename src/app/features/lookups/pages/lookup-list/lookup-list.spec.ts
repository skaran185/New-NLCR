import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupList } from './lookup-list';

describe('LookupList', () => {
  let component: LookupList;
  let fixture: ComponentFixture<LookupList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LookupList],
    }).compileComponents();

    fixture = TestBed.createComponent(LookupList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
