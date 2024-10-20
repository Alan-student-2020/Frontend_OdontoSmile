import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharedService } from 'src/app/service/dataShared/data-shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  perfil: string = "";
  idUser: number = 0;
  administrator: boolean = false;
  receptionist: boolean = false;
  dentist: boolean = false;
  patient: boolean = false;
  patientCare: boolean = false;
  appointment: boolean = false;
  medicalHistory: boolean = false;
  medicalProcedure: boolean = false;
  specialty: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataShared: DataSharedService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.perfil = params['perfil']; // Nombre como string
      this.idUser = +params['id']; // Convertir a número
    });
    this.dataShared.setIdUser(this.idUser);
    this.dataShared.setPerfil(this.perfil);
    console.log(this.perfil, this.idUser);
  }

  redirectAdministrator(){
    this.administrator = true;
    this.receptionist = false;
    this.patient = false
    this.dentist = false;
    this.appointment = false;
    this.medicalHistory = false;
    this.medicalProcedure = false;
    this.specialty = false;
    this.patientCare = false;
  }

  redirectReceptionist(){
    this.receptionist = true;
    this.administrator = false;
    this.patient = false
    this.dentist = false;
    this.appointment = false;
    this.medicalHistory = false;
    this.medicalProcedure = false;
    this.specialty = false;
    this.patientCare = false;
  }

  redirectPatient(){
    this.patient = true;
    this.administrator = false;
    this.receptionist = false;
    this.dentist = false;
    this.appointment = false;
    this.medicalHistory = false;
    this.medicalProcedure = false;
    this.specialty = false;
    this.patientCare = false;
  }

  redirectPatientCare(){
    this.patientCare = true;
    this.patient = false;
    this.administrator = false;
    this.receptionist = false;
    this.dentist = false;
    this.appointment = false;
    this.medicalHistory = false;
    this.medicalProcedure = false;
    this.specialty = false;
  }

  redirectDentist(){
    this.dentist = true;
    this.administrator = false;
    this.receptionist = false;
    this.patient = false
    this.appointment = false;
    this.medicalHistory = false;
    this.medicalProcedure = false;
    this.specialty = false;
    this.patientCare = false;
  }

  redirectAppointment(){
    this.appointment = true;
    this.administrator = false;
    this.receptionist = false;
    this.patient = false
    this.dentist = false;
    this.medicalHistory = false;
    this.medicalProcedure = false;
    this.specialty = false;
    this.patientCare = false;
  }

  redirectMHistory(){
    this.medicalHistory = true;
    this.administrator = false;
    this.receptionist = false;
    this.patient = false
    this.dentist = false;
    this.appointment = false;
    this.medicalProcedure = false;
    this.specialty = false;
    this.patientCare = false;
  }

  redirectMProcedure(){
    this.medicalProcedure = true;
    this.administrator = false;
    this.receptionist = false;
    this.patient = false
    this.dentist = false;
    this.appointment = false;
    this.medicalHistory = false;
    this.specialty = false;
    this.patientCare = false;
  }

  redirectSpecialty(){
    this.specialty = true;
    this.administrator = false;
    this.receptionist = false;
    this.patient = false
    this.dentist = false;
    this.appointment = false;
    this.medicalHistory = false;
    this.medicalProcedure = false;
    this.patientCare = false;
  }

  signOut(){
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
