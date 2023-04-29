export class EmployeeDto {
    userid: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    dob: Date;
    gender: string;
    employeeImage: string;
    createdAt: Date;
    updatedAt: Date | null = null;
    deletedAt: Date | null = null;
    constructor(userid: string, name: string, email: string, password: string, phone: string, address: string, dob: Date, gender: string, employeeImage: string, createdAt: Date,updatedAt: Date | null = null, deletedAt: Date | null = null) {
        this.userid = userid;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.dob = dob;
        this.gender = gender;
        this.employeeImage = employeeImage;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}

export class EmployeeUpdateDto {
    name: string;
    email: string;
    phone: string;
    address: string;
    employeeImage: string;
    updatedAt: Date;
    deletedAt: Date | null = null;
    constructor(name: string, email: string, phone: string, address: string, employeeImage: string, updatedAt: Date,deletedAt: Date | null = null) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.employeeImage = employeeImage;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}