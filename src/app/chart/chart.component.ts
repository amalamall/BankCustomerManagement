import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { CustomerService } from '../customer.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  customers! : Customer[]
  dataGenderType : number[] = []
  types : string[] = ['Female', 'Male','Non-binary','Agender','Genderfluid']
  public chart: any;

  constructor(private customerService: CustomerService) {}


  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'doughnut', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.types,
        datasets: [
          {
            label: 'Banck Customer Gender',
            data: this.dataGenderType,
            backgroundColor: ['#f48080', '#134d9d','#ee3131','#2475e4','#c61111'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 1.2,
      },
    });
  }

  ngOnInit(): void {
    this.customerService
    .getAllCustomers()
    .subscribe((customers: Customer[]) => {
      this.customers = customers;
      this.types.map(t => {
        this.dataGenderType = this.dataGenderType.concat(this.getTotalCustomerByGender(t))
      })
      console.log(this.dataGenderType)
      this.createChart();
    });
  }

  getTotalCustomerByGender(type : string){
    return this.customers.filter((c)=>{
      return c.gender == type
    }).length
    }
}
