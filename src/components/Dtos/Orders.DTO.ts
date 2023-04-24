import type { CartDTO } from "./Carts.DTO";

export class OrderDTO {
    userid: string;
    cart: CartDTO;
    overhaul_price: number;
    status: string;
    createdAt: Date;
    updatedAt: Date | null = null;
    deletedAt: Date | null = null;
    constructor(userid: string, cart:CartDTO, overhaul_price: number, status:string, createdAt: Date,updatedAt: Date | null = null, deletedAt: Date | null = null) {
        this.userid = userid;
        this.cart = cart;
        this.overhaul_price = overhaul_price;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}