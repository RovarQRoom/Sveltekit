export class StoreDto {
    userid: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    detail: string;
    createdAt: Date;
    deletedAt: Date | null = null;
    constructor(userid: string, name: string, email: string, phone: string, address: string, detail: string, createdAt: Date, deletedAt: Date | null = null) {
        this.userid = userid;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.detail = detail;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }
}

export class StoreUpdateDto {
    name: string;
    email: string;
    phone: string;
    address: string;
    detail: string;
    updatedAt: Date;
    constructor(userid: string, name: string, email: string, phone: string, address: string, detail: string, updatedAt: Date) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.detail = detail;
        this.updatedAt = updatedAt;
    }
}