import { IEmployee } from './../../interfaces/employee';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  mode = 'create';
  empId:string;
  employee:IEmployee;
  imagePreview:string;
  constructor(private employeeService:EmployeesService, private route:ActivatedRoute) { }

  form:FormGroup
  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators:[mimeType]
      }),
      firstname: new FormControl(null, {
        validators: [Validators.required]
      }),
      lastname: new FormControl(null, {
        validators: [Validators.required]
      }),
      fathername: new FormControl(null, {
        validators: [Validators.required]
      }),
      mothername: new FormControl(null, {
        validators: [Validators.required]
      }),
      emailaddress: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      phonenumber: new FormControl(null, {
        validators: [Validators.required]
      }),
      dateofbirth: new FormControl(null, {
        validators: [Validators.required]
      }),
      gender: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.route.paramMap.subscribe((paramMap:ParamMap) => {
      if(paramMap.has('id')){
        this.mode = "edit"
        this.empId = paramMap.get('id')
        this.employeeService.editEmployee(this.empId)
        .subscribe(employeeData => {
          this.employee = {_id:employeeData._id,firstname:employeeData.firstname,lastname:employeeData._id,fathername:employeeData.fathername,mothername:employeeData.mothername,emailaddress:employeeData.emailaddress,phonenumber:employeeData.phonenumber,dateofbirth:employeeData.dateofbirth,gender:employeeData.gender,imagePath:null}
          this.form.setValue({
            firstname: this.employee.firstname,
            lastname: this.employee.lastname,
            fathername: this.employee.fathername,
            mothername: this.employee.mothername,
            emailaddress: this.employee.emailaddress,
            phonenumber: this.employee.phonenumber,
            dateofbirth: this.employee.dateofbirth,
            gender: this.employee.gender,
          });
        })
      }else{
        this.mode = "create"
        this.empId = null
      }
    })
  }

  onImagePicked(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file})
    this.form.get('image').updateValueAndValidity()
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  onemployeeCreateForm(){
    if (this.form.invalid) {
      return;
    }
    if(this.mode === "create"){
      this.employeeService.createAndPostEmployees(this.form.value.firstname,this.form.value.lastname,this.form.value.fathername,this.form.value.mothername,this.form.value.emailaddress,this.form.value.phonenumber,this.form.value.dateofbirth,this.form.value.gender,this.form.value.image);
    }else{
      this.employeeService.updateEmployees(
        this.empId,
        this.form.value.firstname,
        this.form.value.lastname,
        this.form.value.fathername,
        this.form.value.mothername,
        this.form.value.emailaddress,
        this.form.value.phonenumber,
        this.form.value.dateofbirth,
        this.form.value.gender,
        this.form.value.imagePath,
      )
    }
  }

}
