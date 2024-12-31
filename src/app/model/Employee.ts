export class EmployeeModel{
    empId: number;
    name: string;
    city: string;
    state: string;
    emailId: string;
    contactNumber: string;
    address: string;
    pincode: string;

    constructor(){
        this.address = '',
        this.city = '',
        this.contactNumber = '',
        this.state = '',
        this.emailId = '',
        this.name = '',
        this.empId = 1
        this.pincode = ''
    }
}