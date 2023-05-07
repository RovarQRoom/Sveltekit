import type { CartItemModel } from "./Carts.DTO";

export class OrderDTO {
    userId: string;
    cart: CartItemModel[];
    overhaul_price: number;
    status: string;
    createdAt: Date;
    updatedAt: Date | null = null;
    deletedAt: Date | null = null;
    constructor(userId: string, cart:CartItemModel[], overhaul_price: number, status:string, createdAt: Date,updatedAt: Date | null = null, deletedAt: Date | null = null) {
        this.userId = userId;
        this.cart = cart;
        this.overhaul_price = overhaul_price;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}

export interface OrderModal {
    id: string;
    userid: string;
    cart: CartItemModel[];
    overhaul_price: number;
    status: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}