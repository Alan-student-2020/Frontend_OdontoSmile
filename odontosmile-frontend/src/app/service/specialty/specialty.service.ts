import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specialty } from 'src/app/model/specialty.model';
import { ApiEndpoints } from 'src/constants/apiEndPoints';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  constructor(private http: HttpClient) {}

  private url = ApiEndpoints.urlBackEnd + '/specialty';

  getById(id: number) {
    let params = new HttpParams().set('id', id);
    return this.http.get<Specialty>(this.url + '/id', {
      params: params,
    });
  }

  getAll() {
    return this.http.get<Specialty[]>(this.url + '/all');
  }

  save(specialty: Specialty) {
    return this.http.post<Specialty>(this.url + '/save', specialty);
  }

  delete(id: number) {
    return this.http.delete<boolean>(this.url + `/delete?id=${id}`);
  }
}
