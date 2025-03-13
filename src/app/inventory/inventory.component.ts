import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { State, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { StockStatus } from '../enums/StockStatus.enum';
import { Item } from '../models/Item';
import { StockStatusPipe } from "../pipes/stockStatus.pipe";
import * as inventoryActions from '../store/actions/inventory.actions';
import { selectAllItems } from '../store/selectors/inventory.selectors';
import { AddInventoryComponent } from './add-Inventory/add-Inventory.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    StockStatusPipe,
    MatDialogModule,
    MatTooltipModule,
    MatSelectModule
  ]
})
export class InventoryComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['#', 'name', 'category', 'stockQuantity', 'lastUpdatedDate', 'stockStatus', 'actions'];
  dataSource = new MatTableDataSource<Item>([]);
  filteredDataSource = new MatTableDataSource<Item>([]);
  StockStatus = StockStatus;
  // stockStatusList = Object.values(StockStatus).filter(value => typeof value === "string");
  stockStatusList = Object.keys(StockStatus).filter(key => isNaN(Number(key)));
  items$!: Observable<Item[]>;
  private destroy$ = new Subject<void>();
  readonly dialog = inject(MatDialog);

  constructor(private store: Store<State<Item>>) { }

  ngOnInit() {
    this.items$ = this.store.select(selectAllItems);
    this.items$.pipe(takeUntil(this.destroy$)).subscribe(response => {
      this.filteredDataSource.data = this.dataSource.data = response;
    });
    this.store.dispatch(inventoryActions.getItemsAction());
  }

  ngAfterViewInit() {
    this.filteredDataSource.paginator = this.paginator;
  }

  filterByName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredDataSource.filter = filterValue.trim().toLowerCase();

    if (this.filteredDataSource.paginator) {
      this.filteredDataSource.paginator.firstPage();
    }
  }

  filterByStatus(status: string) {
    const statusEnumValue = StockStatus[status as keyof typeof StockStatus];
    if (statusEnumValue >= 0) {
      this.filteredDataSource.data = this.dataSource.data.filter(item => item.stockStatus === statusEnumValue);
    } else {
      this.filteredDataSource.data = this.dataSource.data;
    }
    if (this.filteredDataSource.paginator) {
      this.filteredDataSource.paginator.firstPage();
    }
  }

  getIndex(i: number): number {
    return i + 1 + (this.paginator ? this.paginator.pageIndex * this.paginator.pageSize : 0);
  }

  openModal(item: Item | null, editMode: boolean) {
    const dialogRef = this.dialog.open(AddInventoryComponent,
      {
        height: '350px',
        width: '800px',
        maxWidth: 'none',
        data: { item: item, editMode: editMode }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
