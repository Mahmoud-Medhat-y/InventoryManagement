import { Item } from "../../models/Item";

export interface InventoryState {
    item: Item;
    allItems: Item[];
    error: string;
}
