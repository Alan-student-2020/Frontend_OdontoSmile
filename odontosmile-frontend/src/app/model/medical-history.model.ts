import { Time } from "@angular/common";
import { Patient } from "./patient.model";
import { Appointment } from "./appointment.model";

export class MedicalHistory{
  id?: number;
  patient?: Patient;
  appointment?: Appointment;
  date?: Date;
  note?: string;
  treatment?: string;
  constructor(){}
}
