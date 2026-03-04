import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BlogDashboardComponent } from './features/blog/blog-dashboard/blog-dashboard.component';
import { BlogFormComponent } from './features/blog/blog-form/blog-form.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BlogViewComponent } from './features/blog/blog-view/blog-view.component';


@NgModule({
  declarations: [
    AppComponent,
    BlogDashboardComponent,
    BlogFormComponent,
    BlogViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,  // ❌ Disabled in dev
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
