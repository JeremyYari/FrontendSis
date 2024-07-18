import { Pregunta } from "./Pregunta";
import { Respuesta } from "./Respuesta";
import { Usuario } from "./Usuario";

export interface RespuestaUsuario {
    respuesta_usuario_id: number;
    usuario_id: number;
    pregunta_id: number;
    respuesta_id: number;
    test_id: number;
    puntuacion: number;
    usuario: Usuario;
    pregunta: Pregunta;
    respuesta: Respuesta;
}