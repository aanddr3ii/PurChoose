import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrls } from '../../Shared/api-urls';

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  constructor(private http: HttpClient) {}

  getHistorial(userId: number): Observable<any> {
    return this.http.get(ApiUrls.HISTORIAL.LIST(userId));
  }

  deleteHistorial(id: number): Observable<any> {
    return this.http.delete(ApiUrls.HISTORIAL.DELETE(id));
  }

  updateHistorial(id: number, data: any): Observable<any> {
    return this.http.put(ApiUrls.HISTORIAL.UPDATE(id), data);
  }
}