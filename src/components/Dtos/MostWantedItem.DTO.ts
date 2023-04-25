export class MostWantedItemDTO {
    userid: string;
    itemId: string;
    itemQunatity: number;
    itemPrice: number;
    overhaul_price: number;
    createdAt: Date;
    updatedAt: Date | null = null;
    deletedAt: Date | null = null;
    constructor(userid: string, itemId: string, itemQunatity: number, itemPrice: number, overhaul_price: number, status:string, createdAt: Date,updatedAt: Date | null = null, deletedAt: Date | null = null) {
        this.userid = userid;
        this.itemId = itemId;
        this.itemQunatity = itemQunatity;
        this.itemPrice = itemPrice;
        this.overhaul_price = overhaul_price;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}