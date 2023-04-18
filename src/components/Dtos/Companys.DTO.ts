export class CompanyDto {
    userid: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    detail: string;
    companyImage: string;
    createdAt: Date;
    deletedAt: Date | null = null;
    constructor(userid: string, name: string, email: string, phone: string, address: string, detail: string,companyImage: string, createdAt: Date, deletedAt: Date | null = null) {
        this.userid = userid;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.detail = detail;
        this.companyImage = companyImage;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }
}

export class CompanyUpdateDto {
    name: string;
    email: string;
    phone: string;
    address: string;
    detail: string;
    companyImage: string;
    updatedAt: Date;
    constructor(name: string, email: string, phone: string, address: string, detail: string,companyImage: string, updatedAt: Date) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.detail = detail;
        this.companyImage = companyImage;
        this.updatedAt = updatedAt;
    }
}