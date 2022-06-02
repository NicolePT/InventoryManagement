import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ItemService {
	private basePath = 'https://localhost:7052/api/inventory/';

	constructor(private http: HttpClient) { }

	getAllItems(): Observable<any> {
		return this.http.get(this.basePath);
	}
	deleteItemByCode(code: string): Observable<any> {
		return this.http.delete(this.basePath + code)
	}
	createItem(item: any): Observable<any> {
		return this.http.post(this.basePath, item);
	}
	updateItem(id: number, item: any): Observable<any> {
		return this.http.put(this.basePath + id, item);
	}
}