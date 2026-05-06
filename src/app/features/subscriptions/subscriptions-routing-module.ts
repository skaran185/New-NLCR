import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionList } from './pages/subscription-list/subscription-list';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionList
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionsRoutingModule {}
