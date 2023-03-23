import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { NotFoundRouteComponent } from './not-found-route/not-found-route.component';

const routes: Routes = [
  {
    path : '',
    component : HomeComponent
  },
  {
    path : 'customer',
    component : CustomerComponent
  },
  {
    path : 'customer/:id',
    component : CustomerUpdateComponent
  },
  {
    path: 'not-found',
    component: NotFoundRouteComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
