import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeForm : FormGroup = new FormGroup({});

  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel [] = [];

  constructor(){
    debugger;
    this.createForm();
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null){
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }

  createForm(){
    this.employeeForm = new FormGroup({
      empid: new FormGroup(this.employeeObj.empId),
      name: new FormGroup(this.employeeObj.name),
      city: new FormGroup(this.employeeObj.city),
      address: new FormGroup(this.employeeObj.address),
      pincode: new FormGroup(this.employeeObj.pincode),
      contactNumber: new FormGroup(this.employeeObj.contactNumber),
      emailId: new FormGroup(this.employeeObj.emailId),
      state: new FormGroup(this.employeeObj.state),

    })
  }

  onSave(){
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null){
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empid'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    }else{
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem('EmpData',JSON.stringify(this.employeeList));
  }

}
