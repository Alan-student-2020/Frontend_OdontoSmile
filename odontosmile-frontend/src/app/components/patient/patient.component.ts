import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/model/patient.model';
import { PatientService } from 'src/app/service/patient/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  patients: Patient[] = [];
  patient: Patient = new Patient();
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
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.patientService.getAll().subscribe((data) => {
      this.patients = data;
    });
  }

  showDialog(event: any, text: string) {
    this.disabled = false;
    this.visible = true;
    if (event.id == undefined && text == 'Nuevo') {
      this.patient = new Patient();
    } else if (event.id != undefined && text == 'Ver') {
      this.disabled = true;
      this.patient = event;
    } else if (event.id != undefined && text == 'Editar') {
      this.disabled = false;
      this.patient = event;
    }
  }

  delete(patient: Patient) {
    Swal.fire({
      title: 'Quieres eliminar el paciente?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (patient.id) {
          this.patientService
            .delete(patient.id)
            .subscribe((data) => {
              if (data) {
                this.loadData();
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Paciente eliminado',
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
    if (this.patient) {
      this.patientService.save(this.patient).subscribe((data) => {
        if (data) {
          this.loadData();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Paciente registrado/actualizado',
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
    this.patient = new Patient();
  }

  redirectHome() {
    this.router.navigate(['home']);
  }
}
