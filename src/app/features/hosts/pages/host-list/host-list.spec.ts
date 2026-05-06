import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostList } from './host-list';

describe('HostList', () => {
  let component: HostList;
  let fixture: ComponentFixture<HostList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostList],
    }).compileComponents();

    fixture = TestBed.createComponent(HostList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
