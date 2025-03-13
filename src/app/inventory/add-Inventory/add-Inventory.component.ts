import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { State, Store } from '@ngrx/store';
import { Category } from '../../models/Category';
import { Item } from '../../models/Item';
import { CategoryService } from '../../services/Category/category.service';
import * as inventoryActions from '../../store/actions/inventory.actions';
import { InventoryService } from '../../services/Inventory/inventory.service';

@Component({
  selector: 'app-add-Inventory',
  templateUrl: './add-Inventory.component.html',
  styleUrls: ['./add-Inventory.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule
  ]
})
export class AddInventoryComponent implements OnInit {
  form!: FormGroup;
  categories: Category[] = [];
  errorMessage = 'You must select a category!';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private inventoryService: InventoryService,
    private store: Store<State<Item>>,
    public dialogRef: MatDialogRef<AddInventoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getCatgeories();
    // this.categories = inventoryService.categories;
  }

  ngOnInit() {
    this.createForm();
    if (this.data.editMode) {
      this.editForm();
    }
  }

  createForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      categoryId: [null, Validators.required],
      stockQuantity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  editForm() {
    this.form.patchValue({
      id: this.data.item.id,
      name: this.data.item.name,
      categoryId: this.data.item.categoryId,
      stockQuantity: this.data.item.stockQuantity
    });
  }

  get categoryValid() {
    return this.form.get('categoryId')?.hasError('required');
  }

  getCatgeories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.map(c => ({ ...c, id: +c.id }));
    });
  }

  preventNegative(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'e' || event.key === 'E') {
      event.preventDefault();
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.data.editMode) {
        this.store.dispatch(
          inventoryActions.updateItemAction({ item: this.form.value })
        );
      } else {
        this.store.dispatch(
          inventoryActions.addItemAction({ item: this.form.value })
        );
      }
      this.dialogRef.close();
    }
  }
}
