import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEmployee } from 'src/app/interfaces/employee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {


  _id:any
  constructor(private route:ActivatedRoute, private employeeService:EmployeesService) { }

  ngOnInit(){
  this._id = this.route.snapshot.params['id'];
  }
}
