import type { CartItemModel } from "./Carts.DTO";
import type { ItemDto } from "./Items.DTO";
import type { OrderModal } from "./Orders.DTO";

export class RecieptDTO {
    userid: string;
    cart: CartItemModel;
    item: ItemDto;
    order: OrderModal;
    createdAt: Date;
    updatedAt: Date | null = null;
    deletedAt: Date | null = null;
    constructor(userid: string, cart:CartItemModel,item: ItemDto, order: OrderModal, createdAt: Date,updatedAt: Date | null = null, deletedAt: Date | null = null) {
        this.userid = userid;
        this.cart = cart;
        this.item = item;
        this.order = order;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}