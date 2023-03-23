import { Binary } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css'],
})
export class CustomerUpdateComponent implements OnInit {
  customer?: Customer;

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(
        switchMap((params) =>
          this.customerService.getCustomerById(params['id'])
        )
      )
      .subscribe({
        next: (customer) => {
          if (!customer?.hasOwnProperty('amount'))
            this.getControl('amount')?.setValue(0);
          else this.getControl('amount')?.setValue(customer?.amount);

          if (!customer?.hasOwnProperty('type'))
            this.getControl('type')?.setValue('Saving');
          else this.getControl('type')?.setValue(customer?.type);

          this.getControl('firstName')?.setValue(customer?.firstName);
          this.getControl('lastName')?.setValue(customer?.lastName);
          this.getControl('email')?.setValue(customer?.email);
          this.getControl('address')?.setValue(customer?.address);
          this.getControl('gender')?.setValue(customer?.gender);
          return (this.customer = customer);
        },
        error: () => {
          this.router.navigate(['/not-found']);
        },
      });
  }

  updateCustomer() {}

  customerForm: FormGroup;
  isLoading = false;
  selectedGender: string = 'Male';
  selectedType: string = 'saving';
  randomId = Math.random().toString(36).substring(2);

  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.customerForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(30),
        ],
      ],
      gender: ['', [Validators.required, allowedGendersValidator()]],
      type: ['', [Validators.required, allowedTypesValidator()]],
      amount: [0, [Validators.required, Validators.min(0)]],
    });
  }

  get genders() {
    return Object.values(Gender);
  }

  get types() {
    return Object.values(Type);
  }

  getControl(controlName: string) {
    return this.customerForm.get(controlName);
  }

  canSubmit(): boolean {
    return this.customerForm.dirty && this.customerForm.valid;
  }

  submit() {
    this.isLoading = true;
    const accountNumber = generateAccountNumber(this.customer!.id);
    this.customerService
      .updateCustomer({ accountNumber,...this.customer, ...this.customerForm.value })
      .subscribe((customer: Customer) => {
        this.isLoading = false;
        this.router.navigate(['/']);
      });
  }
}

function allowedGendersValidator() {
  return (control: any): { [key: string]: any } | null => {
    const allowedGenders = ['Male', 'Female', 'Genderfluid','Non-binary','Agender'];
    const selectedGender = control.value;
    if (!allowedGenders.includes(selectedGender)) {
      return { invalidGender: true };
    }
    return null;
  };
}

function allowedTypesValidator() {
  return (control: any): { [key: string]: any } | null => {
    const allowedGenders = ['Saving', 'Checking'];
    const selectedGender = control.value;
    if (!allowedGenders.includes(selectedGender)) {
      return { invalidType: true };
    }
    return null;
  };
}

function generateAccountNumber(customerId: string): string {
  const currentDate = new Date().getTime().toString();
  const randomNumber = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');
  const accountNumber = `${customerId}-${currentDate}-${randomNumber}`;
  return accountNumber;
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Genderfluid = 'Genderfluid',
  'Non-Binary' = 'Non-binary',
  Agender = 'Agender'
}

export enum Type {
  Saving = 'Saving',
  Checking = 'Checking',
}
