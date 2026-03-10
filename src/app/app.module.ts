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
import { ExpenseCreateComponent } from './features/expense-create/expense-create.component';
import { ExpenseListComponent } from './features/expense-list/expense-list.component';
import { CalendarComponent } from './features/calendar/calendar.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    BlogDashboardComponent,
    BlogFormComponent,
    BlogViewComponent,
    StatementDashboardComponent,
    ExpenseCreateComponent,
    ExpenseListComponent,
    CalendarComponent,
    AnalyticsComponent,
    NotificationsComponent,
    DashboardComponent
  ],

  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    /* ✅ MATERIAL */
    MatCardModule,
    MatProgressBarModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    /* ✅ CHART */
    NgChartsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
export class AppModule { }