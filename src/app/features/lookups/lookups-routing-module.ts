import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookupList } from './pages/lookup-list/lookup-list';

const routes: Routes = [
  {
    path: '',
    component: LookupList
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LookupsRoutingModule {}
