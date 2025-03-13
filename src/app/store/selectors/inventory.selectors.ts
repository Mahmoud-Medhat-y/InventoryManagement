import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InventoryState } from "../models/InventoryState";

export const selectInventoryFeature = createFeatureSelector<InventoryState>('inventory');

export const selectAllItems = createSelector(
    selectInventoryFeature,
    (state: InventoryState) => state.allItems
);