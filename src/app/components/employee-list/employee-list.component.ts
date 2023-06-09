import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] | undefined;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.readProducts();
  }

  readProducts(): void {
    this.employeeService.readAll()
      .subscribe(
        employees => {
          this.employees = employees;
          console.log(employees);
        },
        error => {
          console.log(error);
        });
  }

  deleteEmployee(id:string): void {
    this.employeeService.delete(id)
      .subscribe(
        employee => {
          console.log(employee)
        },
        error => {
          console.log(error)
        }
      )
  }

  refresh(): void {
    this.readProducts();
  }

}
