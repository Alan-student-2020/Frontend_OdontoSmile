import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Specialty } from 'src/app/model/specialty.model';
import { SpecialtyService } from 'src/app/service/specialty/specialty.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.css'],
})
export class SpecialtyComponent implements OnInit {
  specialtys: Specialty[] = [];
  specialty: Specialty = new Specialty();
  visible: boolean = false;
  submitted: boolean = false;
  disabled: boolean = false;

  constructor(
    private specialtyService: SpecialtyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.specialtyService.getAll().subscribe((data) => {
      this.specialtys = data;
    });
  }

  showDialog(event: any, text: string) {
    this.disabled = false;
    this.visible = true;
    if (event.id == undefined && text == 'Nuevo') {
      this.specialty = new Specialty();
    } else if (event.id != undefined && text == 'Ver') {
      this.disabled = true;
      this.specialty = event;
    } else if (event.id != undefined && text == 'Editar') {
      this.disabled = false;
      this.specialty = event;
    }
  }

  delete(specialty: Specialty) {
    Swal.fire({
      title: 'Quieres eliminar la especialidad médica?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (specialty.id) {
          this.specialtyService
            .delete(specialty.id)
            .subscribe((data) => {
              if (data) {
                this.loadData();
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Especialidad médica eliminado',
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
    if (this.specialty) {
      this.specialtyService
        .save(this.specialty)
        .subscribe((data) => {
          if (data) {
            this.loadData();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Especialidad médica registrado/actualizado',
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
    this.specialty = new Specialty();
  }

  redirectHome() {
    this.router.navigate(['home']);
  }
}
