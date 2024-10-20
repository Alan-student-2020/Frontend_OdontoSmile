import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from 'src/app/dto/login-request.dto';
import { ApiEndpoints } from 'src/constants/apiEndPoints';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }
  private url = ApiEndpoints.urlBackEnd + '/login';

  login(login: LoginRequest) {
    return this.http.post<any>(this.url, login);
  }
}
