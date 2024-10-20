import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {

  idUser: number = 0;
  perfil: string = "";

  constructor() { }

  setIdUser(idUser: number){
    this.idUser = idUser;
  }

  getIdUser(){
    return this.idUser;
  }

  setPerfil(perfil: string){
    this.perfil = perfil;
  }

  getPerfil(){
    return this.perfil;
  }

}
