import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormsModule],
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
      name: new FormGroup(this.employeeObj.name, [Validators.required]),
      city: new FormGroup(this.employeeObj.city),
      address: new FormGroup(this.employeeObj.address),
      pincode: new FormGroup(this.employeeObj.pincode, [Validators.required,Validators.minLength(6)]),
      contactNumber: new FormGroup(this.employeeObj.contactNumber),
      emailId: new FormGroup(this.employeeObj.emailId),
      state: new FormGroup(this.employeeObj.state)

    })
  }

  reset(){
    this.employeeObj = new EmployeeModel();
    this.createForm();
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
    this.reset();
  }

  onEdit(item : EmployeeModel){
    this.employeeObj = item;
    this.createForm();
  }

  onUpdate(){
    const record = this.employeeList.find( m => m.empId == this.employeeForm.controls['empId'].value);
    if(record != undefined){
      record.address = this.employeeForm.controls['address'].value;
      record.name = this.employeeForm.controls['name'].value;
      record.contactNumber = this.employeeForm.controls['contactNumber'].value;
    }

    localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
    this.employeeObj = new EmployeeModel();
    this.reset();

  }

  onDelete(id: number){
    const isDelete = confirm("Are you sure want to delete?")

    if(isDelete){
      const index = this.employeeList.findIndex(m => m.empId == id);
      this.employeeList.splice(index,1);
      localStorage.setItem("EmpData",JSON.stringify(this.employeeList))
    }

  }

}
