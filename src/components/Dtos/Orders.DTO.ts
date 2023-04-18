import type { ItemDto } from "./Items.DTO";

export class OrderDTO {
    userid: string;
    item: ItemDto[];
    status: string;
    createdAt: Date;
    deletedAt: Date | null = null;
    constructor(userid: string, item:ItemDto[], status:string, createdAt: Date, deletedAt: Date | null = null) {
        this.userid = userid;
        this.item = item;
        this.status = status;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }
}