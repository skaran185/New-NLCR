import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupDialog } from './lookup-dialog';

describe('LookupDialog', () => {
  let component: LookupDialog;
  let fixture: ComponentFixture<LookupDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LookupDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(LookupDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
