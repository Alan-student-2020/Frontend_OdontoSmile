import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dentist } from 'src/app/model/dentist.model';
import { Specialty } from 'src/app/model/specialty.model';
import { DentistService } from 'src/app/service/dentist/dentist.service';
import { SpecialtyService } from 'src/app/service/specialty/specialty.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dentist',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.css'],
})
export class DentistComponent implements OnInit {
  dentists: Dentist[] = [];
  specialtys: Specialty[] = [];
  dentist: Dentist = new Dentist();
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
    private dentistService: DentistService,
    private specialtyService: SpecialtyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dentistService.getAll().subscribe((data) => {
      this.dentists = data;
    });
    this.specialtyService.getAll().subscribe(data=>{
      this.specialtys = data;
    });
  }

  showDialog(event: any, text: string) {
    this.disabled = false;
    this.visible = true;
    if (event.id == undefined && text == 'Nuevo') {
      this.dentist = new Dentist();
    } else if (event.id != undefined && text == 'Ver') {
      this.disabled = true;
      this.dentist = event;
    } else if (event.id != undefined && text == 'Editar') {
      this.disabled = false;
      this.dentist = event;
    }
  }

  delete(dentist: Dentist) {
    Swal.fire({
      title: 'Quieres eliminar el dentista?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (dentist.id) {
          this.dentistService
            .delete(dentist.id)
            .subscribe((data) => {
              if (data) {
                this.loadData();
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Dentista eliminado',
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
    if (this.dentist) {
      this.dentistService.save(this.dentist).subscribe((data) => {
        if (data) {
          this.loadData();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Dentista registrado/actualizado',
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
    this.dentist = new Dentist();
  }

  redirectHome() {
    this.router.navigate(['home']);
  }
}
