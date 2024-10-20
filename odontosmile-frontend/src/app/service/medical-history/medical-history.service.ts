import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicalHistory } from 'src/app/model/medical-history.model';
import { ApiEndpoints } from 'src/constants/apiEndPoints';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {

  constructor(private http: HttpClient) {}

  private url = ApiEndpoints.urlBackEnd + '/medical-history';

  getById(id: number) {
    let params = new HttpParams().set('id', id);
    return this.http.get<MedicalHistory>(this.url + '/id', {
      params: params,
    });
  }

  getPatient(id: number) {
    let params = new HttpParams().set('id', id);
    return this.http.get<MedicalHistory[]>(this.url + '/patient', {
      params: params,
    });
  }

  getAppointment(id: number) {
    let params = new HttpParams().set('id', id);
    return this.http.get<MedicalHistory>(this.url + '/appointment', {
      params: params,
    });
  }

  getAll() {
    return this.http.get<MedicalHistory[]>(this.url + '/all');
  }

  save(medicalHistory: MedicalHistory) {
    return this.http.post<MedicalHistory>(this.url + '/save', medicalHistory);
  }

  delete(id: number) {
    return this.http.delete<boolean>(this.url + `/delete?id=${id}`);
  }
}
