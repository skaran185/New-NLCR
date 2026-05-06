import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsRoutingModule } from './subscriptions-routing-module';
import { SubscriptionList } from './pages/subscription-list/subscription-list';
import { BillingList } from './pages/billing-list/billing-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SubscriptionList, BillingList],
  imports: [CommonModule, SubscriptionsRoutingModule,FormsModule,ReactiveFormsModule],
})
export class SubscriptionsModule {}
