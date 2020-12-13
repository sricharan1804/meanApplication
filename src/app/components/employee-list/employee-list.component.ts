import { IEmployee } from './../../interfaces/employee';
import { PageEvent } from '@angular/material/paginator';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  employeesList: IEmployee[] = [];
  private employeesSub: Subscription;
  totalEmployees = 10;
  employeesPerPage = 2;
  pageSizeOptions = [1,2,5,10]

  constructor(private employeeService:EmployeesService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees();
    this.employeesSub = this.employeeService.getEmployeetUpdateListener()
      .subscribe((employeesList: IEmployee[]) => {
        this.employeesList = employeesList;
      });
  }

  onPageChanged(pageData:PageEvent){

  }
  onDeleteEmployee(empId: string) {
    this.employeeService.deleteEmployeesById(empId);
  }

  ngOnDestroy() {
    this.employeesSub.unsubscribe();
  }
}
