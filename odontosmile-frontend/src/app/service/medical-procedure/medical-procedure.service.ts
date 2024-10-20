import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicalProcedure } from 'src/app/model/medical-procedure.model';
import { ApiEndpoints } from 'src/constants/apiEndPoints';

@Injectable({
  providedIn: 'root',
})
export class MedicalProcedureService {
  constructor(private http: HttpClient) {}

  private url = ApiEndpoints.urlBackEnd + '/medical-procedure';

  getById(id: number) {
    let params = new HttpParams().set('id', id);
    return this.http.get<MedicalProcedure>(this.url + '/id', {
      params: params,
    });
  }

  getAll() {
    return this.http.get<MedicalProcedure[]>(this.url + '/all');
  }

  save(medicalProcedure: MedicalProcedure) {
    return this.http.post<MedicalProcedure>(
      this.url + '/save',
      medicalProcedure
    );
  }

  delete(id: number) {
    return this.http.delete<boolean>(this.url + `/delete?id=${id}`);
  }
}
