import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from 'src/app/model/patient.model';
import { ApiEndpoints } from 'src/constants/apiEndPoints';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) {}

  private url = ApiEndpoints.urlBackEnd + '/patient';

  getById(id: number) {
    let params = new HttpParams().set('id', id);
    return this.http.get<Patient>(this.url + '/id', {
      params: params,
    });
  }

  getAll() {
    return this.http.get<Patient[]>(this.url + '/all');
  }

  save(patient: Patient) {
    return this.http.post<Patient>(this.url + '/save', patient);
  }

  delete(id: number) {
    return this.http.delete<boolean>(this.url + `/delete?id=${id}`);
  }
}
