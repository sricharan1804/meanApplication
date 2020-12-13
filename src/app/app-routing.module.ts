import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'employeeform' },
  {path:'employeeform',component:EmployeeCreateComponent},
  {path:'employeeeditform/:id',component:EmployeeCreateComponent},
  {path:'employeeslist',component:EmployeeListComponent},
  {path:'employeesdetails/:id',component:EmployeeDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
