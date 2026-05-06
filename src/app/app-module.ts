import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingInterceptor } from './core/interceptors/loading-interceptor';
import { LayoutModule } from './layout/layout-module';
import { AuthTokenInterceptor } from './core/interceptors/auth-token-interceptor';
import { ErrorInterceptor } from './core/interceptors/error-interceptor';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    LayoutModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    // VERY IMPORTANT
    HttpClientModule,

    MatProgressSpinnerModule,

    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 2000,
      progressBar: true,
      closeButton: true,
    }),
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [App],
})
export class AppModule {}
