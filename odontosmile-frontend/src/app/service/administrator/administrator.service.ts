import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Administrator } from 'src/app/model/administrator.model';
import { ApiEndpoints } from 'src/constants/apiEndPoints';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private http: HttpClient) {}

  private url = ApiEndpoints.urlBackEnd + '/administrator';

  getById(id: number) {
    let params = new HttpParams().set('id', id);
    return this.http.get<Administrator>(this.url + '/id', {
      params: params,
    });
  }

  getAll() {
    return this.http.get<Administrator[]>(this.url + '/all');
  }

  save(administrator: Administrator) {
    return this.http.post<Administrator>(this.url + '/save', administrator);
  }

  delete(id: number) {
    return this.http.delete<boolean>(this.url + `/delete?id=${id}`);
  }
}
