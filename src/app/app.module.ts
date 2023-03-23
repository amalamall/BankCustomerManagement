import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CardComponent } from './card/card.component';
import { ListingCardComponent } from './listing-card/listing-card.component';
import { ChartComponent } from './chart/chart.component';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundRouteComponent } from './not-found-route/not-found-route.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerComponent,
    NavigationComponent,
    CardComponent,
    ListingCardComponent,
    ChartComponent,
    CustomerUpdateComponent,
    NotFoundRouteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
