import { createReducer, on } from "@ngrx/store";
import { InventoryState } from "../models/InventoryState";
import * as inventoryActions from '../actions/inventory.actions';
import { Item } from "../../models/Item";

export const initialState: InventoryState = {
    item: {} as Item,
    allItems: [],
    error: ''
};

export const inventoryReducer = createReducer(
    initialState,
    // on(inventoryActions.getItemsAction, (state, action) => ({ ...state, allItems: action.allItems })),
    on(inventoryActions.getItemsActionSuccess, (state, action) => ({ ...state, allItems: action.allItems })),
    on(inventoryActions.addItemAction, (state, action) => ({ ...state, item: action.item })),
    on(inventoryActions.updateItemAction, (state, action) => ({ ...state, item: action.item })),
);