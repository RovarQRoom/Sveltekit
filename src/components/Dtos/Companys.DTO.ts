export class CompanyDto {
    userid: string;
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
        this.userid = userid;
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

export class CompanyUpdateDto {
    name: string;
    email: string;
    phone: string;
    address: string;
    detail: string;
    companyImage: string;
    updatedAt: Date;
    deletedAt: Date | null = null;
    constructor(name: string, email: string, phone: string, address: string, detail: string,companyImage: string, updatedAt: Date,deletedAt: Date | null = null) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.detail = detail;
        this.companyImage = companyImage;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}