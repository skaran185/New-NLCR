import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostsListComponent } from './pages/host-list/host-list';
import { HostDetailComponent } from './pages/host-detail/host-detail';

const routes: Routes = [
  { path: '', component: HostsListComponent },
  { path: ':id', component: HostDetailComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HostsRoutingModule {}
