export class StoreDto {
    userId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    detail: string;
    storeImage: string;
    createdAt: Date;
    updatedAt: Date | null = null;
    deletedAt: Date | null = null;
    constructor(userId: string, name: string, email: string, phone: string, address: string, detail: string,storeImage: string, createdAt: Date,updatedAt: Date | null = null, deletedAt: Date | null = null) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.detail = detail;
        this.storeImage = storeImage;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}

export interface StoreModal {
    id: string;
    userId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    detail: string;
    storeImage: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}

export interface StoreUpdateModal {
    name: string;
    email: string;
    phone: string;
    address: string;
    detail: string;
    storeImage: string | null;
    updatedAt: Date;
    deletedAt: Date | null;
}