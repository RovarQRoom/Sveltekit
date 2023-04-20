export class ItemDto {
    userid: string;
    name: string;
    detail: string;
    type: string;
    quantity: number;
    buy_price: string;
    sale_price_more: string;
    sale_price_less: string;
    item_created_date: Date;
    item_expired_date: Date;
    itemImage: string;
    createdAt: Date;
    updatedAt: Date | null = null;
    deletedAt: Date | null = null;
    constructor(userid: string, name: string, detail: string, type: string, quantity: number, buy_price: string, sale_price_more: string, sale_price_less: string, item_created_date: Date, item_expired_date: Date, itemImage: string  ,createdAt: Date, updatedAt:Date | null = null, deletedAt: Date | null = null) {
        this.userid = userid;
        this.name = name;
        this.detail = detail;
        this.type = type;
        this.quantity = quantity;
        this.buy_price = buy_price;
        this.sale_price_more = sale_price_more;
        this.sale_price_less = sale_price_less;
        this.item_created_date = item_created_date;
        this.item_expired_date = item_expired_date;
        this.itemImage = itemImage;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}

export class ItemUpdateDto {
    name: string;
    detail: string;
    type: string;
    quantity: number;
    buy_price: string;
    sale_price_more: string;
    sale_price_less: string;
    item_created_date: Date;
    item_expired_date: Date;
    itemImage: string;
    updatedAt: Date;
    deletedAt: Date | null = null;
    constructor(name: string, detail: string, type: string, quantity: number, buy_price: string, sale_price_more: string, sale_price_less: string, item_created_date: Date, item_expired_date: Date, itemImage:string, updatedAt: Date, deletedAt: Date | null = null) {
        this.name = name;
        this.detail = detail;
        this.type = type;
        this.quantity = quantity;
        this.buy_price = buy_price;
        this.sale_price_more = sale_price_more;
        this.sale_price_less = sale_price_less;
        this.item_created_date = item_created_date;
        this.item_expired_date = item_expired_date;
        this.itemImage = itemImage;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}