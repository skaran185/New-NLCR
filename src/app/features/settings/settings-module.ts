import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing-module';
import { PlatformConfig } from './pages/platform-config/platform-config';
import { Policies } from './pages/policies/policies';

@NgModule({
  declarations: [PlatformConfig, Policies],
  imports: [CommonModule, SettingsRoutingModule],
})
export class SettingsModule {}
