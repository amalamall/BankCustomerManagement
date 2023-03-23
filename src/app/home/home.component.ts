import { Customer } from './../models/customer.model';
import { CustomerService } from './../customer.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totalPages: number = 0;
  pages: number[] = [];

  items: { Title: string; Value: string }[] = [
    {
      Title: 'Total Customers',
      Value: '',
    },
    {
      Title: 'Total Amount',
      Value: '',
    },
  ];

  totalCustomers?: number;
  totalAmount: number = 0;
  CustomerService: any;
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService
      .getAllCustomers()
      .subscribe((customers: Customer[]) => {
        this.customers = customers;
        this.totalAmount = this.customers?.reduce(
          (previousValue, currentValue) => {
            if (currentValue.hasOwnProperty('amount'))
              return previousValue + Number(currentValue.amount);
            return previousValue + 0;
          },
          0
        );
        this.totalCustomers = this.customers?.length;
        this.totalPages = Math.ceil(this.totalCustomers / 5);
        this.pages = Array(this.totalPages)
          .fill(0)
          .map((x, i) => i + 1);

        this.items[0].Value = this.totalCustomers + '';
        this.items[1].Value = this.totalAmount + '';
      });
  }

  deleteCustomer(customer: Customer) {
    // this.setIsLoading(customer, true);
    this.customerService.deleteCustomer(customer).subscribe(() => {
      this.customers = this.customers.filter((c) => c.id !== customer.id);
      this.totalCustomers = this.customers.length;
      this.items[0].Value = this.totalCustomers + '';

      this.totalPages = Math.ceil(this.totalCustomers / 5);
      this.pages = Array(this.totalPages)
        .fill(0)
        .map((x, i) => i + 1);

      // this.setIsLoading(customer, false);
    });
  }

  // private setIsLoading(customer: Customer, isLoading: boolean) {
  //   this.isDeleteLoading = this.isDeleteLoading.map((c) => {
  //     if (c.id === customer.id) {
  //       return { ...c, isLoading };
  //     }
  //     return c;
  //   });
  // }
}
