import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../service/Login.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'registrar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
})
export class RegistrarUsuarioComponent {
  UsuarioForm: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private loginService: LoginService,
    private router: Router
  ) {
    this.UsuarioForm = new FormGroup({
      apellidos: new FormControl('', [Validators.required, Validators.minLength(4)]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
      fecha_nacimiento: new FormControl(''),
      correo: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(8)]),
      tipo_usuario: new FormControl('1', Validators.required),
      coordenadas: new FormControl(''),
    });
  }

  registrarUsuario(): void {
    this.isFormSubmitted = true;

    if (this.UsuarioForm.invalid) {
      return;
    }

    // Obtener coordenadas antes de enviar el formulario
    this.obtenerCoordenadas()
      .then((coords: string) => {
        // Agregar las coordenadas al formulario
        this.UsuarioForm.patchValue({ coordenadas: coords });

        // Obtener los datos del formulario actualizados con las coordenadas
        const usuarioData = this.UsuarioForm.value;

        // Llamar al servicio para registrar el usuario con coordenadas
        this.registrarUsuarioConCoordenadas(usuarioData);
      })
      .catch((error) => {
        console.error('Error al obtener coordenadas:', error);
        // Manejar error obteniendo coordenadas
      });
  }

  private obtenerCoordenadas(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = position.coords;
            const coordenadas = `${coords.latitude},${coords.longitude}`;
            resolve(coordenadas);
          },
          (error) => {
            reject('Error al obtener coordenadas: ' + error.message);
          }
        );
      } else {
        reject('Geolocalización no soportada por el navegador');
      }
    });
  }

  private registrarUsuarioConCoordenadas(usuarioData: any): void {
    this.loginService.registrarLogin(usuarioData)
      .subscribe(
        (result: any) => {
          console.log(result);
          this.mostrarMensajeExito();
        },
        (error: any) => {
          console.error('Error al registrar usuario:', error);
          this.mostrarMensajeError();
        }
      );
  }

  private mostrarMensajeExito(): void {
    this.UsuarioForm.reset();
    this.isFormSubmitted = false;
    Swal.fire({
      icon: 'success',
      title: 'Registro Exitoso',
      text: '¡Usuario registrado exitosamente!',
    }).then(() => {
      this.router.navigate(['/escoger-rol']);
    });
  }

  private mostrarMensajeError(): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: '¡Ocurrió un error al registrar el usuario!',
    });
  }

  cancelarRegistro(): void {
    this.UsuarioForm.reset();
    this.isFormSubmitted = false;
    Swal.fire({
      icon: 'info',
      title: 'Registro Cancelado',
      text: '¡Se canceló el registro del usuario!',
    });
  }
}
