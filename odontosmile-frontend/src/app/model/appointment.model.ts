import { Patient } from './patient.model';
import { Dentist } from './dentist.model';
import { MedicalProcedure } from './medical-procedure.model';
import { AppointmentStatus } from '../enums/appointmentStatus.enum';

export class Appointment {
  id?: number;
  patient?: Patient;
  dentist?: Dentist;
  medicalProcedure?: MedicalProcedure;
  date?: Date;
  status?: AppointmentStatus;
  constructor() {}
}
