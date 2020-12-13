import { IEmployee } from 'src/app/interfaces/employee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private readonly apiUrl = "http://localhost:3000/api/employees";
  private employees: IEmployee[] = [];
  private employeesUpdated = new Subject<IEmployee[]>()

  constructor(private http:HttpClient,private router: Router) { }

  createAndPostEmployees(firstname:string,lastname:string,fathername:string,mothername:string,emailaddress:string,phonenumber:string,dateofbirth:string,gender:string,image:File){
    const employeeData = new FormData();
    employeeData.append("firstname",firstname);
    employeeData.append("lastname",lastname);
    employeeData.append("fathername",fathername);
    employeeData.append("mothername",mothername);
    employeeData.append("emailaddress",emailaddress);
    employeeData.append("phonenumber",phonenumber);
    employeeData.append("dateofbirth",dateofbirth);
    employeeData.append("gender",gender);
    employeeData.append("image",image,firstname);
    this.http
    .post<{message: string, employee: IEmployee}>
    (`${this.apiUrl}`,employeeData)
    .subscribe(responseData => {
      const employeeData : IEmployee = { _id: responseData.employee._id,firstname:firstname, lastname: lastname,fathername:fathername,mothername:mothername,emailaddress:emailaddress,phonenumber:phonenumber,dateofbirth:dateofbirth,gender:gender,imagePath:responseData.employee.imagePath };
      const id = responseData.employee._id;
      employeeData._id = id;
      this.employees.push(employeeData);
      this.employeesUpdated.next([...this.employees]);
    });
  }

  getEmployees(){
    return this.http.get<{employees:any}>(`${this.apiUrl}`)
    .pipe(map((employeeData) => {
      return employeeData.employees.map(employee => {
        return {
          firstname: employee.firstname,
          lastname: employee.lastname,
          fathername: employee.fathername,
          mothername: employee.mothername,
          emailaddress: employee.emailaddress,
          phonenumber: employee.phonenumber,
          dateofbirth: employee.dateofbirth,
          gender: employee.gender,
          imagePath:employee.imagePath,
          _id: employee._id,
        }
      })
    }))
    .subscribe(employeeData => {
      this.employees = employeeData;
      this.employeesUpdated.next([...this.employees]);
    });
  }

  getEmployeesById(_id:string){
    return this.http.get<{employees:IEmployee[]}>(`${this.apiUrl}/${_id}`)
    .subscribe(responseData => {
      this.employees = responseData.employees
      this.employeesUpdated.next([...this.employees]);
    })
  }

  getEmployeetUpdateListener() {
    return this.employeesUpdated.asObservable();
  }

  deleteEmployeesById(empId:string){
    this.http.delete(`${this.apiUrl}/${empId}`)
      .subscribe(() => {
        const updatedPosts = this.employees.filter(employee => employee._id !== empId);
        this.employees = updatedPosts;
        this.employeesUpdated.next([...this.employees]);
      });
  }

  editEmployee(id:string){
   return this.http.get<{_id: string,firstname:string,lastname:string,fathername:string,mothername:string,emailaddress:string,phonenumber:string,dateofbirth:string,gender:string }>(
      `${this.apiUrl} / ${id}`
    );
  }

  updateEmployees(_id: string,firstname:string,lastname:string,fathername:string,mothername:string,emailaddress:string,phonenumber:string,dateofbirth:string,gender:string,imagePath:null) {
    const employee: IEmployee = { _id: _id,firstname:firstname, lastname: lastname,fathername:fathername,mothername:mothername,emailaddress:emailaddress,phonenumber:phonenumber,dateofbirth:dateofbirth,gender:gender,imagePath:imagePath };
    this.http
      .put(`${this.apiUrl}/${_id}`, employee)
      .subscribe(response => {
        const updateEmployees = [...this.employees];
        const oldPostIndex = updateEmployees.findIndex(p => p._id === employee._id);
        updateEmployees[oldPostIndex] = employee;
        this.employees = updateEmployees;
        this.employeesUpdated.next([...this.employees]);
        this.router.navigate(["/"]);
      });
  }

}
