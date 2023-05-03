
export interface CartItemModel {
    id: string;
    userid: string;
    name: string;
    detail: string;
    item_image: string;
    item_price: number;
    total_price: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}