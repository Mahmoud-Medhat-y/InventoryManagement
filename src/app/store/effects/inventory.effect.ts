import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { InventoryService } from '../../services/Inventory/inventory.service';
import * as inventoryActions from '../actions/inventory.actions';
import { State, Store } from '@ngrx/store';
import { Item } from '../../models/Item';

@Injectable({ providedIn: 'root' })
export class InventoryEffects {
    private actions$ = inject(Actions);

    constructor(private inventoryService: InventoryService, private store: Store<State<Item>>) { }

    getItems$ = createEffect(() =>
        this.actions$.pipe(
            tap(() => console.log('Effect triggered')),
            ofType(inventoryActions.getItemsAction),
            switchMap(() =>
                this.inventoryService.getItems().pipe(
                    tap((response) => console.log('API Response:', response)),
                    map((items) =>
                        inventoryActions.getItemsActionSuccess({ allItems: items })
                    ),
                    catchError((error) => {
                        console.error('API Error:', error);
                        return of(
                            inventoryActions.getItemsActionFailure({ error: error.message || 'Failed to add item' })
                        );
                    })
                )
            )
        )
    );

    addItem$ = createEffect(() =>
        this.actions$.pipe(
            tap(() => console.log('Effect triggered')),
            ofType(inventoryActions.addItemAction),
            switchMap(({ item }) =>
                this.inventoryService.addItem(item).pipe(
                    tap((response) => console.log('API Response:', response)),
                    map((addedItem) =>
                        inventoryActions.addItemActionSuccess({ item: addedItem }),
                        this.store.dispatch(inventoryActions.getItemsAction())
                    ),
                    catchError((error) => {
                        console.error('API Error:', error);
                        return of(
                            inventoryActions.addItemActionFailure({ error: error.message || 'Failed to add item' })
                        );
                    })
                )
            )
        )
    );

    updateItem$ = createEffect(() =>
        this.actions$.pipe(
            tap(() => console.log('Effect triggered')),
            ofType(inventoryActions.updateItemAction),
            switchMap(({ item }) =>
                this.inventoryService.updateItem(item).pipe(
                    tap((response) => console.log('API Response:', response)),
                    map((updatedItem) =>
                        inventoryActions.updateItemActionSuccess({ item: updatedItem }),
                        this.store.dispatch(inventoryActions.getItemsAction())
                    ),
                    catchError((error) => {
                        console.error('API Error:', error);
                        return of(
                            inventoryActions.updateItemActionFailure({ error: error.message || 'Failed to update item' })
                        );
                    })
                )
            )
        )
    );
}