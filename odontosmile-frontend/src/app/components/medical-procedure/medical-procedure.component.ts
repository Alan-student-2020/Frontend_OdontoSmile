import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicalProcedure } from 'src/app/model/medical-procedure.model';
import { MedicalProcedureService } from 'src/app/service/medical-procedure/medical-procedure.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medical-procedure',
  templateUrl: './medical-procedure.component.html',
  styleUrls: ['./medical-procedure.component.css']
})
export class MedicalProcedureComponent implements OnInit {
  medicalProcedures: MedicalProcedure[] = [];
  medicalProcedure: MedicalProcedure = new MedicalProcedure();
  visible: boolean = false;
  submitted: boolean = false;
  disabled: boolean = false;

  constructor(
    private medicalProcedureService: MedicalProcedureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.medicalProcedureService.getAll().subscribe((data) => {
      this.medicalProcedures = data;
    });
  }

  showDialog(event: any, text: string) {
    this.disabled = false;
    this.visible = true;
    if (event.id == undefined && text == 'Nuevo') {
      this.medicalProcedure = new MedicalProcedure();
    } else if (event.id != undefined && text == 'Ver') {
      this.disabled = true;
      this.medicalProcedure = event;
    } else if (event.id != undefined && text == 'Editar') {
      this.disabled = false;
      this.medicalProcedure = event;
    }
  }

  delete(medicalProcedure: MedicalProcedure) {
    Swal.fire({
      title: 'Quieres eliminar el procedimiento médico?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (medicalProcedure.id) {
          this.medicalProcedureService
            .delete(medicalProcedure.id)
            .subscribe((data) => {
              if (data) {
                this.loadData();
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Procedimiento médico eliminado',
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
    if (this.medicalProcedure) {
      this.medicalProcedureService.save(this.medicalProcedure).subscribe((data) => {
        if (data) {
          this.loadData();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Procedimiento médico registrado/actualizado',
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
    this.medicalProcedure = new MedicalProcedure();
  }

  redirectHome(){
    this.router.navigate(['home']);
  }

}
