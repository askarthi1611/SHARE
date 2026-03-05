import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration }
from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  HttpClientModule,
  provideHttpClient,
  withFetch
} from '@angular/common/http';

import { ServiceWorkerModule }
from '@angular/service-worker';

import { provideAnimationsAsync }
from '@angular/platform-browser/animations/async';

/* ✅ COMMON */
import { CommonModule } from '@angular/common';

/* ✅ MATERIAL */
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule }
from '@angular/material/progress-bar';
import { MatTableModule }
from '@angular/material/table';

/* ✅ CHART */
import { NgChartsModule, BaseChartDirective }
from 'ng2-charts';

/* COMPONENTS */
import { BlogDashboardComponent } from './features/blog/blog-dashboard/blog-dashboard.component';
import { BlogFormComponent } from './features/blog/blog-form/blog-form.component';
import { BlogViewComponent } from './features/blog/blog-view/blog-view.component';
import { StatementDashboardComponent } from './features/loan/statement-dashboard/statement-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogDashboardComponent,
    BlogFormComponent,
    BlogViewComponent,
    StatementDashboardComponent
  ],

  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    /* ✅ MATERIAL */
    MatCardModule,
    MatProgressBarModule,
    MatTableModule,

    /* ✅ CHART */
    NgChartsModule,

    ServiceWorkerModule.register(
      'ngsw-worker.js',
      {
        enabled: true,
        registrationStrategy:
        'registerWhenStable:30000'
      }
    )
  ],

  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimationsAsync()
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}