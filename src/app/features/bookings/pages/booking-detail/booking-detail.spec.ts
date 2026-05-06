import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDetail } from './booking-detail';

describe('BookingDetail', () => {
  let component: BookingDetail;
  let fixture: ComponentFixture<BookingDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
