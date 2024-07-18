import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule, NgForOf } from '@angular/common';
import { NavbarSimpleComponent } from '../navbar-simple/navbar-simple.component';
import { RouterOutlet } from '@angular/router';
import { UserService } from '../guardarusuario/user.service';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule, NgForOf, NavbarSimpleComponent, RouterOutlet],
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  resultados: any[] = [];
  usuarioId: number | undefined;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.usuarioId = this.userService.getUsuarioId();
    if (this.usuarioId !== undefined) {
      this.obtenerResultados();
    } else {
      console.error('No se pudo obtener el ID del usuario');
      // Manejar el caso donde no hay un usuario ID disponible (redirigir, mostrar mensaje, etc.)
    }
  }

  obtenerResultados(): void {
    if (this.usuarioId !== undefined) {
      this.http.get<any[]>(`http://127.0.0.1:5000/ver-resultado/${this.usuarioId}`).subscribe(
        (res) => {
          this.resultados = res;
          console.log('Resultados obtenidos:', this.resultados); // Log the results to verify
        },
        (error) => {
          console.error('Error al obtener los resultados:', error);
        }
      );
    }
  }
}
