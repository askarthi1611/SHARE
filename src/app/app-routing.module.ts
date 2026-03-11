import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDashboardComponent } from './features/blog/blog-dashboard/blog-dashboard.component';
import { BlogFormComponent } from './features/blog/blog-form/blog-form.component';
import { BlogViewComponent } from './features/blog/blog-view/blog-view.component';
import { StatementDashboardComponent } from './features/loan/statement-dashboard/statement-dashboard.component';
import { CalendarComponent } from './features/calendar/calendar.component';
import { ExpenseCreateComponent } from './features/expense-create/expense-create.component';
import { ExpenseListComponent } from './features/expense-list/expense-list.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { EventCreateComponent } from './features/event-create/event-create.component';
import { EventListComponent } from './features/event-list/event-list.component';

const routes: Routes = [
  { path: '', component: BlogDashboardComponent },
  { path: 'blog/create', component: BlogFormComponent },
  { path: 'blog/edit/:id', component: BlogFormComponent },
  { path: 'blog/:id', component: BlogViewComponent }, {
    path: 'statement', component: StatementDashboardComponent },
  { path: 'calendar', component: CalendarComponent },
  //expense
  { path: 'expenses', component: ExpenseListComponent },
  { path: 'expenses/create', component: ExpenseCreateComponent },
  //dashboard
  { path: 'dashboard', component: DashboardComponent },
  //notifications
  { path: 'notifications', component: NotificationsComponent }, 
  { path: 'events/create', component: EventCreateComponent }, 
  { path: 'events', component: EventListComponent }, 

  { path: '**', redirectTo: '' }

];
//use hash routing 
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }