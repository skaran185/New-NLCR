import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesRoutingModule } from './vehicles-routing-module';
import { VehicleList } from './pages/vehicle-list/vehicle-list';
import { VehicleDetail } from './pages/vehicle-detail/vehicle-detail';

@NgModule({
  declarations: [VehicleList, VehicleDetail],
  imports: [CommonModule, VehiclesRoutingModule],
})
export class VehiclesModule {}
