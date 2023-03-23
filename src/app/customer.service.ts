import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './models/customer.model';
import { Observable } from 'rxjs';


const API_URL = 'http://localhost:3000/customers';

// total c and total ammount ne change pas lors du add and update
// delete customer ne change pas totalPages 

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  getCustomers(page : number): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_URL}?_page=${page}&_limit=5`);
  }

  getCustomerById(id: string) : Observable<Customer>{
    return  this.http.get<Customer>(`${API_URL}/${id}`);
  }

  getCustomerByName(name:string){
    return this.http.get<Customer[]>(`${API_URL}?firstName=${name}`);

  }

  getCustomerByEmail(email:string){
    return this.http.get<Customer[]>(`${API_URL}?email=${email}`);

  }


  // add create
  addCustomer(customer : Customer): Observable<Customer> {
    return this.http.post<Customer>(API_URL, customer);
  }

  // add update

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${API_URL}/${customer.id}`, customer);
  }

  // add delete

  deleteCustomer(customer: Customer) {
    return this.http.delete(`${API_URL}/${customer.id}`);
  }

  // add serach
  search(q: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_URL}?q=${q}`);
  }

  // get customers
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_URL}`);
  }

}
