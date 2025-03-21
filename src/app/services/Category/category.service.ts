import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Category } from '../../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiURL = environment.apiURL;
  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(`${this.apiURL}/Categories`);
  }

}
