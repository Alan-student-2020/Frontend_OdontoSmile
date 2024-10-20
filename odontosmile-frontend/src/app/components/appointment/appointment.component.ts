import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment.model';
import { Dentist } from 'src/app/model/dentist.model';
import { MedicalProcedure } from 'src/app/model/medical-procedure.model';
import { Patient } from 'src/app/model/patient.model';
import { AppointmentService } from 'src/app/service/appointment/appointment.service';
import { DentistService } from 'src/app/service/dentist/dentist.service';
import { MedicalProcedureService } from 'src/app/service/medical-procedure/medical-procedure.service';
import { PatientService } from 'src/app/service/patient/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  appointments: Appointment[] = [];
  patients: Patient[] = [];
  dentists: Dentist[] = [];
  medicalProcedures: MedicalProcedure[] = [];
  appointment: Appointment = new Appointment();
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
    {
      name: 'Finalizada',
      value: 'Finished',
    }
  ];

  constructor(
    private router: Router,
    private patientService: PatientService,
    private dentistService: DentistService,
    private medicalProcedureService: MedicalProcedureService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.patientService.getAll().subscribe((data) => {
      this.patients = data;
    });

    this.dentistService.getAll().subscribe((data) => {
      this.dentists = data;
    });

    this.appointmentService.getAll().subscribe((data) => {
      this.appointments = data;
    });

    this.medicalProcedureService.getAll().subscribe((data) => {
      this.medicalProcedures = data;
    });
  }

  showDialog(event: any, text: string) {
    this.disabled = false;
    this.visible = true;
    if (event.id == undefined && text == 'Nuevo') {
      this.appointment = new Appointment();
    } else if (event.id != undefined && text == 'Ver') {
      this.disabled = true;
      event.date = this.formatDateString(event.date);
      this.appointment = event;
    } else if (event.id != undefined && text == 'Editar') {
      this.disabled = false;
      event.date = this.formatDateString(event.date.toString());
      this.appointment = event;
    }
  }

  delete(appointment: Appointment) {
    Swal.fire({
      title: 'Quieres eliminar la cita?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (appointment.id) {
          this.appointmentService.delete(appointment.id).subscribe((data) => {
            if (data) {
              this.loadData();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cita eliminada',
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
    if (this.appointment) {
      this.appointmentService.save(this.appointment).subscribe((data) => {
        if (data) {
          this.loadData();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cita registrada/actualizada',
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
    this.appointment = new Appointment();
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
