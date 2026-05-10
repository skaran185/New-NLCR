import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleList } from './pages/vehicle-list/vehicle-list';
const routes: Routes = [
  { path: '', component: VehicleList },
  // future: { path: ':id', component: VehicleDetailComponent },
];


@NgModule({
  imports: [
    
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class VehiclesRoutingModule { }
