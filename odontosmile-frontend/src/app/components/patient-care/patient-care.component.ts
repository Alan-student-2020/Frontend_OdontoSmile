import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentStatus } from 'src/app/enums/appointmentStatus.enum';
import { Appointment } from 'src/app/model/appointment.model';
import { MedicalHistory } from 'src/app/model/medical-history.model';
import { MedicalProcedure } from 'src/app/model/medical-procedure.model';
import { Patient } from 'src/app/model/patient.model';
import { AppointmentService } from 'src/app/service/appointment/appointment.service';
import { DataSharedService } from 'src/app/service/dataShared/data-shared.service';
import { DentistService } from 'src/app/service/dentist/dentist.service';
import { MedicalHistoryService } from 'src/app/service/medical-history/medical-history.service';
import { MedicalProcedureService } from 'src/app/service/medical-procedure/medical-procedure.service';
import { PatientService } from 'src/app/service/patient/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-care',
  templateUrl: './patient-care.component.html',
  styleUrls: ['./patient-care.component.css'],
})
export class PatientCareComponent implements OnInit {
  appointments: Appointment[] = [];
  patients: Patient[] = [];
  medicalProcedures: MedicalProcedure[] = [];
  appointment: Appointment = new Appointment();
  medicalHistory: MedicalHistory = new MedicalHistory();
  visible: boolean = false;
  submitted: boolean = false;
  disabled: boolean = false;
  appointmentStatus = [
    {
      name: 'Confirmada',
      value: 'Confirmed',
    },
    {
      name: 'Pendiente',
      value: 'Earring',
    },
    {
      name: 'Cancelada',
      value: 'Cancelled',
    },
  ];

  constructor(
    private router: Router,
    private patientService: PatientService,
    private medicalProcedureService: MedicalProcedureService,
    private medicalHistoryService: MedicalHistoryService,
    private appointmentService: AppointmentService,
    private dataShared: DataSharedService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.patientService.getAll().subscribe((data) => {
      this.patients = data;
    });

    this.appointmentService.getByDentist(this.dataShared.getIdUser()).subscribe((data) => {
      this.appointments = data;
    });

    this.medicalProcedureService.getAll().subscribe((data) => {
      this.medicalProcedures = data;
    });
  }

  showDialog(event: any, text: string) {
    this.disabled = false;
    this.visible = true;
    if (event.id != undefined && text == 'Ver') {
      this.disabled = true;
      event.date = this.formatDateString(event.date);
      this.appointment = event;
    } else if (event.id != undefined && text == 'Atender') {
      this.disabled = false;
      event.date = this.formatDateString(event.date.toString());
      this.appointment = event;
    }
  }

  onSubmit() {
    this.submitted = true;
    this.appointment.status = AppointmentStatus.Finished;
    this.medicalHistory.patient = this.appointment.patient;
    this.medicalHistory.appointment = this.appointment;
    if (this.medicalHistory && this.appointment) {
      this.appointmentService.save(this.appointment).subscribe(data=>{
        if (data) {
          this.loadData();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cita actualizada',
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
      this.medicalHistoryService.save(this.medicalHistory).subscribe((data) => {
        if (data) {
          this.loadData();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cita finalizada',
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
    this.medicalHistory = new MedicalHistory();
  }

  formatDateString(dateString: string): string {
    const date = new Date(dateString);

    // Obtener partes de la fecha
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes (0-11)
    const day = String(date.getDate()).padStart(2, '0'); // Día
    const hours = String(date.getHours()).padStart(2, '0'); // Horas en formato 24h
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutos

    // Retornar el formato deseado
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}
