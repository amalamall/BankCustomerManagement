import { Customer } from './../models/customer.model';
import { CustomerService } from './../customer.service';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';


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

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {
  customerForm: FormGroup;
  isLoading = false;
  selectedGender: string = 'Male';
  selectedType: string = 'saving';
  randomId = Math.random().toString(36).substring(2);

  constructor(
    private formBuilder: FormBuilder,
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
      email: [
        '',
        [Validators.required, Validators.email],
        [this.validateEmail.bind(this)],
      ],
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

    this.getControl('gender')?.setValue('Male');
    this.getControl('type')?.setValue('Saving');
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

  validateEmail(
    control: AbstractControl
  ): Observable<{ emailExists: boolean } | null> {
    return this.customerService.getCustomerByEmail(control.value).pipe(
      map((customers: Customer[]) => {
        if (customers.length > 0) {
          return { emailExists: true };
        }
        return null;
      })
    );
  }



  submit() {
    this.isLoading = true;
    const id = this.randomId;
    const accountNumber = generateAccountNumber(id);
    this.customerService
      .addCustomer({ id, accountNumber, ...this.customerForm.value })
      .subscribe((customer: Customer) => {
        console.log(customer);
        this.isLoading = false;
        this.customerForm.reset();
        this.router.navigate(['/']);
      });
  }
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
