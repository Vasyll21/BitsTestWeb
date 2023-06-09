import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeToSend } from 'src/app/models/employee-to-send';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  currentEmployee:Employee | undefined;
  employeeToUpdate!: EmployeeToSend;
  message = "";

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getEmployee(this.route.snapshot.paramMap.get('id'));
  }

  getEmployee(id:any): void {
    this.employeeService.read(id)
      .subscribe(
        employee => {
          this.currentEmployee = employee;
          console.log(employee);
        },
        error => {
          console.log(error);
        });
  }

  updateProduct(): void {
    this.employeeToUpdate.name = this.currentEmployee!.name
    this.employeeToUpdate.dateOfBirth = this.currentEmployee!.dateOfBirth
    this.employeeToUpdate.married = this.currentEmployee!.married
    this.employeeToUpdate.phone = this.currentEmployee!.phone
    this.employeeToUpdate.salary = this.currentEmployee!.salary

    this.employeeService.update(this.currentEmployee!.id, this.employeeToUpdate)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The product was updated!';
        },
        error => {
          console.log(error);
        });
  }

  deleteProduct(): void {
    this.employeeService.delete(this.currentEmployee!.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/employees']);
        },
        error => {
          console.log(error);
        });
  }

}
