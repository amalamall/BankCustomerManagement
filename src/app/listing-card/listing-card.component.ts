import { Customer } from './../models/customer.model';
import { CustomerService } from './../customer.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css'],
})
export class ListingCardComponent implements OnInit {
  @Input() pages: number[] = [];
  @Input() data: Customer[] = [];
  customers: Customer[] = [];
  page = 0;
  searchQuery = '';
  searchQuerySubject = new Subject<string>();
  isDeleteLoading: any[] = [];
  @Output() delete = new EventEmitter<Customer>();



  onDelete(customer: Customer) {
    this.delete.emit(customer);
    this.setIsLoading(customer, true);
    this.customers = this.customers.filter((c) => {
      return c.id !== customer.id;
    });
    this.setIsLoading(customer, true);
    this.customerService.getCustomers(this.page).subscribe((customers) => {
      if (customers.length - 1 === 0) {
        this.previousPage();
      }
    });
  }

  constructor(private customerService: CustomerService) {
    this.searchQuerySubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query: string) => {
        this.search(query);
      });
  }

  getData(page: number) {
    this.page = page ? page : this.page;
    this.customerService.getCustomers(this.page).subscribe((customers) => {
      this.customers = customers;
    });
  }

  ngOnInit(): void {
    this.customerService.getCustomers(this.page).subscribe((customers) => {
      this.customers = customers;
    });

    this.customerService.getAllCustomers().subscribe((customers) => {
      this.isDeleteLoading = customers.map((p) => ({
        id: p.id,
        isLoading: false,
      }));
    });
  }

  nextPage() {
    this.page++;
    if (this.pages.length && this.page > this.pages.length) {
      this.page = 1;
    }
    this.getData(this.page);
  }

  previousPage() {
    this.page--;
    if (this.page === -1 && this.pages.length) {
      this.page = this.pages.length - 1;
    }
    this.getData(this.page);
  }

  search(query: string) {
    this.customerService.search(query).subscribe((customers) => {
      this.customers = customers;
    });
    // this.getData(this.page)
  }

  onQuery(event: any) {
    this.searchQuery = event.target.value;
    this.searchQuerySubject.next(event.target.value);
  }


  getIsDeleteLoading(customer: Customer) {
    return this.isDeleteLoading.find((p) => p.id === customer.id)?.isLoading;
  }

  private setIsLoading(customer: Customer, isLoading: boolean) {
    this.isDeleteLoading = this.isDeleteLoading.map((c) => {
      if (c.id === customer.id) {
        return { ...c, isLoading };
      }
      return c;
    });
  }
}
