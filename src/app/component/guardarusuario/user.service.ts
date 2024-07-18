import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usuarioIdKey = 'usuarioId';
  private usuarioId: number | undefined;

  constructor() {
    // Intentar obtener el usuarioId desde el localStorage al inicializar el servicio (si está disponible)
    if (typeof localStorage !== 'undefined') {
      const storedUsuarioId = localStorage.getItem(this.usuarioIdKey);
      if (storedUsuarioId) {
        this.usuarioId = parseInt(storedUsuarioId, 10);
      }
    } else {
      console.warn('localStorage no está disponible en este entorno.');
    }
  }

  setUsuarioId(usuarioId: number) {
    this.usuarioId = usuarioId;
    // Almacenar el usuarioId en localStorage para persistencia si está disponible
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.usuarioIdKey, usuarioId.toString());
    } else {
      console.warn('No se puede almacenar usuarioId en localStorage: localStorage no está disponible.');
    }
  }

  getUsuarioId(): number | undefined {
    return this.usuarioId;
  }

  limpiarUsuarioId() {
    this.usuarioId = undefined;
    // Limpiar también del localStorage si está disponible
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.usuarioIdKey);
    } else {
      console.warn('No se puede limpiar usuarioId en localStorage: localStorage no está disponible.');
    }
  }
}