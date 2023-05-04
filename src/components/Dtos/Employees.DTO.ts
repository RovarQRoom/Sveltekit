export class EmployeeDto {
    userId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    dob: Date;
    gender: string;
    employeeImage: string;
    createdAt: Date;
    updatedAt: Date | null = null;
    deletedAt: Date | null = null;
    constructor(userId: string, name: string, email: string, phone: string, address: string, dob: Date, gender: string, employeeImage: string, createdAt: Date,updatedAt: Date | null = null, deletedAt: Date | null = null) {
        this.userId = userId;
        this.name = name;
        this.email = email;
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

export interface EmployeeModal {
    id: string;
    userId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    dob: Date;
    gender: string;
    employeeImage: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}

export interface EmployeeUpdateModal {
    name: string;
    email: string;
    phone: string;
    address: string;
    employeeImage: string | null;
    updatedAt: Date;
    deletedAt: Date | null;
}