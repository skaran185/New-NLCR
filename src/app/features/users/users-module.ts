import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing-module';
import { UserList } from './pages/user-list/user-list';
import { UserDetail } from './pages/user-detail/user-detail';

@NgModule({
  declarations: [UserList, UserDetail],
  imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}
