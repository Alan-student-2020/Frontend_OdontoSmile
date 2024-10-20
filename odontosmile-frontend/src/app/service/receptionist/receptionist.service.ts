import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receptionist } from 'src/app/model/receptionist.model';
import { ApiEndpoints } from 'src/constants/apiEndPoints';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistService {

  constructor(private http: HttpClient) {}

  private url = ApiEndpoints.urlBackEnd + '/receptionist';

  getById(id: number) {
    let params = new HttpParams().set('id', id);
    return this.http.get<Receptionist>(this.url + '/id', {
      params: params,
    });
  }

  getAll() {
    return this.http.get<Receptionist[]>(this.url + '/all');
  }

  save(receptionist: Receptionist) {
    return this.http.post<Receptionist>(this.url + '/save', receptionist);
  }

  delete(id: number) {
    return this.http.delete<boolean>(this.url + `/delete?id=${id}`);
  }
}
