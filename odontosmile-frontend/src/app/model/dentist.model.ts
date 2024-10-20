import { Specialty } from "./specialty.model";

export class Dentist{
  id?: number;
  name?: string;
  lastName?: string;
  gender?: string;
  typeDocument?: string;
  documentNumber?: number;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  creationDate?: Date;
  specialty?: Specialty;
  constructor(){}
}
