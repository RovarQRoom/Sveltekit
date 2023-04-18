export class StoreDto {
    userid: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    detail: string;
    storeImage: string;
    createdAt: Date;
    deletedAt: Date | null = null;
    constructor(userid: string, name: string, email: string, phone: string, address: string, detail: string,storeImage: string, createdAt: Date, deletedAt: Date | null = null) {
        this.userid = userid;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.detail = detail;
        this.storeImage = storeImage;
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
    storeImage: string;
    updatedAt: Date;
    constructor(name: string, email: string, phone: string, address: string, detail: string,storeImage: string, updatedAt: Date) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.detail = detail;
        this.storeImage = storeImage;
        this.updatedAt = updatedAt;
    }
}