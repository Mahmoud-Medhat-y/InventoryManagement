import { createAction, props } from "@ngrx/store";
import { Item } from "../../models/Item";

//GET Actions
export const getItemsAction = createAction(
    '[InventoryList] getItems',
    // props<{ allItems: Item[] }>()
);
export const getItemsActionSuccess = createAction(
    '[InventoryList] getItems success',
    props<{ allItems: Item[] }>()
);
export const getItemsActionFailure = createAction(
    '[InventoryList] getItems failure',
    props<{ error: string }>()
);

//POST Actions
export const addItemAction = createAction(
    '[InventoryList] addItem',
    props<{ item: Item }>()
);
export const addItemActionSuccess = createAction(
    '[InventoryList] addItem success',
    props<{ item: Item }>()
);
export const addItemActionFailure = createAction(
    '[InventoryList] addItem failure',
    props<{ error: string }>()
);

//UPDATE Actions
export const updateItemAction = createAction(
    '[InventoryList] updateItem',
    props<{ item: Item }>()
);
export const updateItemActionSuccess = createAction(
    '[InventoryList] updateItem success',
    props<{ item: Item }>()
);
export const updateItemActionFailure = createAction(
    '[InventoryList] updateItem failure',
    props<{ error: string }>()
);