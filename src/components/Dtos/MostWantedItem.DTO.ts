export class MostWantedItemDTO {
    userid: string;
    itemId: string;
    itemName: string;
    itemQuantity: number;
    itemPrice: number;
    overhaul_price: number;
    createdAt: Date;
    updatedAt: Date | null = null;
    deletedAt: Date | null = null;
    constructor(userid: string, itemId: string, itemName: string, itemQuantity: number, itemPrice: number, overhaul_price: number, createdAt: Date,updatedAt: Date | null = null, deletedAt: Date | null = null) {
        this.userid = userid;
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemQuantity = itemQuantity;
        this.itemPrice = itemPrice;
        this.overhaul_price = overhaul_price;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}