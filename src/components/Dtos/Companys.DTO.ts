export class CreateCompanyDto {
    userId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    detail: string;
    companyImage: string;
    createdAt: Date;
    updatedAt: Date | null = null;
    deletedAt: Date | null = null;
    constructor(userid: string, name: string, email: string, phone: string, address: string, detail: string,companyImage: string, createdAt: Date,updatedAt: Date | null = null, deletedAt: Date | null = null) {
        this.userId = userid;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.detail = detail;
        this.companyImage = companyImage;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}

export interface CompanyModal {
    id: string;
    userId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    detail: string;
    companyImage: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}

export interface CompanyUpdateModal {
    name: string;
    email: string;
    phone: string;
    address: string;
    detail: string;
    companyImage: string | null;
    updatedAt: Date;
    deletedAt: Date | null;
}