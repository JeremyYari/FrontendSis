// user.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usuarioId: number | undefined;

  constructor() { }

  setUsuarioId(usuarioId: number) {
    this.usuarioId = usuarioId;
  }

  getUsuarioId(): number | undefined {
    return this.usuarioId;
  }
}
