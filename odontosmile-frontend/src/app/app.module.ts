import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { MedicalHistoryComponent } from './components/medical-history/medical-history.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { ReceptionistComponent } from './components/receptionist/receptionist.component';
import { DentistComponent } from './components/dentist/dentist.component';
import { PatientComponent } from './components/patient/patient.component';
import { MedicalProcedureComponent } from './components/medical-procedure/medical-procedure.component';
import { SpecialtyComponent } from './components/specialty/specialty.component';
import { PatientCareComponent } from './components/patient-care/patient-care.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    AppointmentComponent,
    MedicalHistoryComponent,
    AdministratorComponent,
    ReceptionistComponent,
    DentistComponent,
    PatientComponent,
    MedicalProcedureComponent,
    SpecialtyComponent,
    PatientCareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    TableModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    DividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
