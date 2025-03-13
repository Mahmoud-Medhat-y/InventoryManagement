import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Item } from '../../models/Item';
import { StockStatus } from '../../enums/StockStatus.enum';
import { Observable } from 'rxjs';
import { CategoryService } from '../Category/category.service';
import { Category } from '../../models/Category';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  apiURL = environment.apiURL;
  categories: Category[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
    }),
  };

  constructor(private http: HttpClient, private categoryService: CategoryService) {
    this.getCatgeories();
  }

  getCatgeories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.map(c => ({ ...c, id: +c.id }));
    });
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiURL}/Items`);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.apiURL}/Items`, this.handleItem(item), this.httpOptions);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.patch<Item>(`${this.apiURL}/Items/${item.id}`, this.handleItem(item), this.httpOptions);
  }

  private handleItem(item: Item) {
    const category = this.categories.find(x => x.id == item.categoryId)?.name as string;
    const newItem: Item = { ...item, category: category, lastUpdatedDate: new Date(), stockStatus: this.checkStockStatus(item.stockQuantity) };
    return newItem;
  }

  private checkStockStatus(quantity: number) {
    switch (true) {
      case quantity < 20 && quantity > 0:
        return StockStatus.LowStock
      case quantity == 0:
        return StockStatus.OutOfStock
      default:
        return StockStatus.InStock
    }
  }
}
