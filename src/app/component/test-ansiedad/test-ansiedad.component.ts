import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../guardarusuario/user.service';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarSimpleComponent } from '../navbar-simple/navbar-simple.component';
import { RouterOutlet } from '@angular/router';
interface Pregunta {
  pregunta_id: number;
  pregunta: string;
}

interface Respuesta {
  respuesta_id: number;
  respuesta: string;
  puntaje: number;
}

interface RespuestaEnviar {
  usuario_id: number;
  pregunta_id: number;
  respuesta_id: number;
  fecha_respuesta: string; // Asegúrate de que la fecha esté en formato "yyyy-MM-dd"
}

@Component({
  selector: 'app-test-ansiedad',
  templateUrl: './test-ansiedad.component.html',
  standalone: true,
  imports: [NgForOf, CommonModule, FormsModule, NavbarSimpleComponent, RouterOutlet],
  styleUrls: ['./test-ansiedad.component.css']
})
export class TestAnsiedadComponent implements OnInit {
  preguntas: Pregunta[] = [];
  respuestas: Respuesta[] = [];
  usuarioId: number | undefined;
  preguntaActualIndex = 0;
  respuestaActualId: number | undefined;
  respuestasEnviar: RespuestaEnviar[] = [];
  resultado: any;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.usuarioId = this.userService.getUsuarioId();
    this.obtenerPreguntas();
    this.obtenerRespuestas();
  }

  obtenerPreguntas() {
    this.http.get<Pregunta[]>('http://127.0.0.1:5000/preguntas')
      .subscribe(
        (preguntas) => {
          this.preguntas = preguntas;
          if (this.preguntas.length > 0) {
            this.preguntaActualIndex = 0;
          }
        },
        (error) => {
          console.error('Error al obtener preguntas:', error);
        }
      );
  }

  obtenerRespuestas() {
    this.http.get<Respuesta[]>('http://127.0.0.1:5000/respuestas')
      .subscribe(
        (respuestas) => {
          this.respuestas = respuestas;
        },
        (error) => {
          console.error('Error al obtener respuestas:', error);
        }
      );
  }

  guardarRespuestaActual() {
    if (!this.usuarioId || this.respuestaActualId === undefined || this.preguntas.length === 0) {
      console.error('Falta el usuarioId, no se ha seleccionado respuesta o no hay preguntas disponibles');
      return;
    }
  
    const preguntaActual = this.preguntas[this.preguntaActualIndex];
    const respuestaSeleccionada = this.respuestas.find(respuesta => respuesta.respuesta_id === this.respuestaActualId);
  
    if (!respuestaSeleccionada) {
      console.error('No se encontró la respuesta seleccionada en el array de respuestas');
      return;
    }
  
    const fechaRespuesta = new Date().toISOString().slice(0, 10); // Formato "yyyy-MM-dd"
  
    const respuestaEnviar: RespuestaEnviar = {
      usuario_id: this.usuarioId!,
      pregunta_id: preguntaActual.pregunta_id,
      respuesta_id: respuestaSeleccionada.respuesta_id,
      fecha_respuesta: fechaRespuesta
    };
  
    this.respuestasEnviar.push(respuestaEnviar);
    this.respuestaActualId = undefined; // Limpiar la respuesta seleccionada
  
    // Reiniciar el ngModel de respuestaActualId para deseleccionar el radio button
    setTimeout(() => {
      this.respuestaActualId = undefined;
    }, 0);
  
    this.avanzarPregunta();
  }
  avanzarPregunta() {
    if (this.preguntaActualIndex < this.preguntas.length - 1) {
      this.preguntaActualIndex++;
    } else {
      this.enviarRespuestas();
    }
    this.respuestaActualId = undefined;
  }

  enviarRespuestas() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post<any>('http://127.0.0.1:5000/guardar-respuestas', this.respuestasEnviar, { headers })
      .subscribe(
        (res) => {
          console.log('Respuestas guardadas exitosamente:', res);
          this.resultado = res;
        },
        (error) => {
          console.error('Error al guardar las respuestas:', error);
        }
      );
  }

  seleccionarRespuesta(respuestaId: number) {
    this.respuestaActualId = respuestaId;
  }
}
