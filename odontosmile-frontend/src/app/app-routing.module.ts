import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { MedicalHistoryComponent } from './components/medical-history/medical-history.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { ReceptionistComponent } from './components/receptionist/receptionist.component';
import { DentistComponent } from './components/dentist/dentist.component';
import { PatientComponent } from './components/patient/patient.component';
import { MedicalProcedureComponent } from './components/medical-procedure/medical-procedure.component';
import { SpecialtyComponent } from './components/specialty/specialty.component';
import { PatientCareComponent } from './components/patient-care/patient-care.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path:'login',
    component: LoginComponent,
  },
  {
    path:'home/:perfil/:id',
    component: HomeComponent
  },
  {
    path:'administrator',
    component: AdministratorComponent
  },
  {
    path:'receptionist',
    component: ReceptionistComponent
  },
  {
    path:'dentist',
    component: DentistComponent
  },
  {
    path: 'patient',
    component: PatientComponent
  },
  {
    path:'patient-care',
    component: PatientCareComponent
  },
  {
    path:'appointment',
    component: AppointmentComponent
  },
  {
    path:'medical-history',
    component: MedicalHistoryComponent
  },
  {
    path:'medical-procedure',
    component: MedicalProcedureComponent
  },
  {
    path:'specialty',
    component: SpecialtyComponent
  },
  {
    path:'**',
    component: PageNotFoundComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
