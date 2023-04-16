export default class StoreDto {
    userid: string;
    name: string;
    address: string;
    phone: string;
    email: string;
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