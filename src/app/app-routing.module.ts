import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDashboardComponent } from './features/blog/blog-dashboard/blog-dashboard.component';
import { BlogFormComponent } from './features/blog/blog-form/blog-form.component';
import { BlogViewComponent } from './features/blog/blog-view/blog-view.component';
import { StatementDashboardComponent } from './features/loan/statement-dashboard/statement-dashboard.component';

const routes: Routes = [
  { path: '', component: BlogDashboardComponent },
  { path: 'blog/create', component: BlogFormComponent },
  { path: 'blog/edit/:id', component: BlogFormComponent },
  { path: 'blog/:id', component: BlogViewComponent }, {
    path: 'statement',
    component: StatementDashboardComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }