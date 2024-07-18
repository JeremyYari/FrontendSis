import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../guardarusuario/user.service'; // Importar el servicio

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: Login;
  
  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    this.loginObj = new Login();
  }

  onLogin() {
    this.http.post('http://127.0.0.1:5000/login', this.loginObj).subscribe((res: any) => {
      if (res.success) {
        alert('Inicio de sesión exitoso');
        localStorage.setItem('angular17token', res.token); // Guardar el token en localStorage
        
        // Guardar el usuario_id usando el servicio UserService
        this.userService.setUsuarioId(res.usuario_id);

        // Navegar a la página deseada después del inicio de sesión
        this.router.navigateByUrl('/opcion-usuario');
      } else {
        alert('Correo o contraseña incorrectos');
      }
    }, (error) => {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud, por favor inténtelo de nuevo.');
    });
  }

}

export class Login {
  correo: string;
  contrasena: string;

  constructor() {
    this.correo = '';
    this.contrasena = '';
  }
}