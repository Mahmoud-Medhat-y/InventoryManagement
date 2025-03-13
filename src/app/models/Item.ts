import { StockStatus } from "../enums/StockStatus.enum";

export interface Item {
    id: number;
    categoryId: number;
    category: string;
    name: string;
    stockQuantity: number;
    lastUpdatedDate: Date;
    stockStatus: StockStatus
}
