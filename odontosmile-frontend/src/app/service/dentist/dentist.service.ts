import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dentist } from 'src/app/model/dentist.model';
import { ApiEndpoints } from 'src/constants/apiEndPoints';

@Injectable({
  providedIn: 'root'
})
export class DentistService {

  constructor(private http: HttpClient) {}

  private url = ApiEndpoints.urlBackEnd + '/dentist';

  getById(id: number) {
    let params = new HttpParams().set('id', id);
    return this.http.get<Dentist>(this.url + '/id', {
      params: params,
    });
  }

  getAll() {
    return this.http.get<Dentist[]>(this.url + '/all');
  }

  save(dentist: Dentist) {
    return this.http.post<Dentist>(this.url + '/save', dentist);
  }

  delete(id: number) {
    return this.http.delete<boolean>(this.url + `/delete?id=${id}`);
  }
}
