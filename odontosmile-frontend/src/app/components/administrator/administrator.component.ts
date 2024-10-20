import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrator } from 'src/app/model/administrator.model';
import { AdministratorService } from 'src/app/service/administrator/administrator.service';
import { DentistService } from 'src/app/service/dentist/dentist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css'],
})
export class AdministratorComponent implements OnInit {
  administrators: Administrator[] = [];
  administrator: Administrator = new Administrator();
  visible: boolean = false;
  submitted: boolean = false;
  disabled: boolean = false;
  genders = [
    {
      name: 'Masculino',
    },
    {
      name: 'Femenino',
    },
  ];
  typeDocuments = [
    {
      name: 'CC',
    },
    {
      name: 'TI',
    },
  ];

  constructor(
    private administratorService: AdministratorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.administratorService.getAll().subscribe((data) => {
      this.administrators = data;
    });
  }

  showDialog(event: any, text: string) {
    this.disabled = false;
    this.visible = true;
    if (event.id == undefined && text == 'Nuevo') {
      this.administrator = new Administrator();
    } else if (event.id != undefined && text == 'Ver') {
      this.disabled = true;
      this.administrator = event;
    } else if (event.id != undefined && text == 'Editar') {
      this.disabled = false;
      this.administrator = event;
    }
  }

  delete(administrator: Administrator) {
    Swal.fire({
      title: 'Quieres eliminar el administrador?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (administrator.id) {
          this.administratorService
            .delete(administrator.id)
            .subscribe((data) => {
              if (data) {
                this.loadData();
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Administrador eliminado',
                  showConfirmButton: false,
                  timer: 1500,
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Algo salio mal!',
                  footer: 'Comunicate con el administrador del sistema',
                });
              }
            });
        }
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.administrator) {
      this.administratorService.save(this.administrator).subscribe((data) => {
        if (data) {
          this.loadData();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Administrador registrado/actualizado',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salio mal!',
            footer: 'Comunicate con el administrador del sistema',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Por favor, complete todos los campos',
      });
    }
    this.visible = false;
    this.administrator = new Administrator();
  }

  redirectHome(){
    this.router.navigate(['home']);
  }
}
