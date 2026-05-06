import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login';
import { AuthGuard } from './core/guards/auth-guard';
import { ShellComponent } from './layout/shell/shell';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard-module').then(m => m.DashboardModule)
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./features/users/users-module').then(m => m.UsersModule)
      },
      {
        path: 'hosts',
        loadChildren: () =>
          import('./features/hosts/hosts-module').then(m => m.HostsModule)
      },
      {
        path: 'vehicles',
        loadChildren: () =>
          import('./features/vehicles/vehicles-module').then(m => m.VehiclesModule)
      },
      {
        path: 'bookings',
        loadChildren: () =>
          import('./features/bookings/bookings-module').then(m => m.BookingsModule)
      },
      {
        path: 'subscriptions',
        loadChildren: () =>
          import('./features/subscriptions/subscriptions-module').then(m => m.SubscriptionsModule)
      },
      {
        path: 'lookups',
        loadChildren: () =>
          import('./features/lookups/lookups-module')
            .then(m => m.LookupsModule)
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./features/reports/reports-module').then(m => m.ReportsModule)
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings-module').then(m => m.SettingsModule)
      }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
