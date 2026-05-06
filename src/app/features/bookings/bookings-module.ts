import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing-module';
import { BookingList } from './pages/booking-list/booking-list';
import { BookingDetail } from './pages/booking-detail/booking-detail';

@NgModule({
  declarations: [BookingList, BookingDetail],
  imports: [CommonModule, BookingsRoutingModule],
})
export class BookingsModule {}
