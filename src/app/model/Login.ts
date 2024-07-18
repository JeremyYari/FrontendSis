import { Usuario } from "./Usuario";

export interface Login {
    login_id: number;
    contrasena: string;
    usuario: Usuario;
}