import { Receptionist } from './../../model/receptionist.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReceptionistService } from 'src/app/service/receptionist/receptionist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.css'],
})
export class ReceptionistComponent implements OnInit {

  receptionists: Receptionist[] = [];
  receptionist: Receptionist = new Receptionist();
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
    private receptionistService: ReceptionistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.receptionistService.getAll().subscribe((data) => {
      this.receptionists = data;
    });
  }

  showDialog(event: any, text: string) {
    this.disabled = false;
    this.visible = true;
    if (event.id == undefined && text == 'Nuevo') {
      this.receptionist = new Receptionist();
    } else if (event.id != undefined && text == 'Ver') {
      this.disabled = true;
      this.receptionist = event;
    } else if (event.id != undefined && text == 'Editar') {
      this.disabled = false;
      this.receptionist = event;
    }
  }

  delete(receptionist: Receptionist) {
    Swal.fire({
      title: 'Quieres eliminar la recepcionista?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (receptionist.id) {
          this.receptionistService
            .delete(receptionist.id)
            .subscribe((data) => {
              if (data) {
                this.loadData();
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Recepcionista eliminada',
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
    if (this.receptionist) {
      this.receptionistService.save(this.receptionist).subscribe((data) => {
        if (data) {
          this.loadData();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Recepcionista registrada/actualizada',
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
    this.receptionist = new Receptionist();
  }

  redirectHome() {
    this.router.navigate(['home']);
  }
}
