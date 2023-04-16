export class EmployeeDto {
    userid: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    dob: Date;
    gender: string;
    createdAt: Date;
    deletedAt: Date | null = null;
    constructor(userid: string, name: string, email: string, phone: string, address: string, dob: Date, gender: string, createdAt: Date, deletedAt: Date | null = null) {
        this.userid = userid;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.dob = dob;
        this.gender = gender;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }
}

export class EmployeeUpdateDto {
    name: string;
    email: string;
    phone: string;
    address: string;
    updatedAt: Date;
    constructor(name: string, email: string, phone: string, address: string, updatedAt: Date) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.updatedAt = updatedAt;
    }
}