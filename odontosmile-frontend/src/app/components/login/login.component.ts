import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/dto/login-request.dto';
import { LoginService } from 'src/app/service/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  login: LoginRequest = new LoginRequest();
  submitted: boolean = false;
  userProfiles = [
    {
      name: 'Administrador', value: 'Administrator'
    },
    {
      name: 'Recepcionista', value: 'Receptionist'
    },
    {
      name: 'Dentista', value: 'Dentist'
    }
  ];

  constructor(
    private loginService: LoginService,
    private router: Router
  ){}

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.login.documentNumber && this.login.password) {
      this.loginService.login(this.login).subscribe(data=>{
        if(data != null){
          this.router.navigate(['home', this.login.userProfile, data.id]);
        }else{
          Swal.fire({
            icon: "error",
            title: "Credenciales incorrectas",
            footer: 'Intenta nuevamente'
          });
        }
      });
    } else {
      console.log('Por favor, complete todos los campos.');
    }
  }

}
