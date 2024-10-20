import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicalHistory } from 'src/app/model/medical-history.model';
import { Patient } from 'src/app/model/patient.model';
import { MedicalHistoryService } from 'src/app/service/medical-history/medical-history.service';
import { PatientService } from 'src/app/service/patient/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css'],
})
export class MedicalHistoryComponent implements OnInit {
  patients: Patient[] = [];
  medicalHistory: MedicalHistory = new MedicalHistory();
  medicalHistorys: MedicalHistory[] = [];
  submitted: boolean = false;

  constructor(
    private patientService: PatientService,
    private medicalHistoryService: MedicalHistoryService,
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

  onSubmit() {
    this.submitted = true;
    if (this.medicalHistory.patient && this.medicalHistory.patient.id) {
      this.medicalHistoryService
          .getPatient(this.medicalHistory.patient.id)
          .subscribe((data) => {
            this.medicalHistorys = data;
            if (data) {
              this.loadData();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Consulta exitosa',
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
  }

  redirectHome() {
    this.router.navigate(['home']);
  }
}
