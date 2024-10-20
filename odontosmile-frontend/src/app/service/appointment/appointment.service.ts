import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from 'src/app/model/appointment.model';
import { ApiEndpoints } from 'src/constants/apiEndPoints';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  private url = ApiEndpoints.urlBackEnd + '/appointment';

  getById(id: number) {
    let params = new HttpParams().set('id', id);
    return this.http.get<Appointment>(this.url + '/id', {
      params: params,
    });
  }

  getByDentist(id: number) {
    let params = new HttpParams().set('id', id);
    return this.http.get<Appointment[]>(this.url + '/dentist', {
      params: params,
    });
  }

  getAll() {
    return this.http.get<Appointment[]>(this.url + '/all');
  }

  save(appointment: Appointment) {
    return this.http.post<Appointment>(this.url + '/save', appointment);
  }

  delete(id: number) {
    return this.http.delete<boolean>(this.url + `/delete?id=${id}`);
  }

}
