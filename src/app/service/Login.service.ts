import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getConexionBackend } from '../utils/constants';
import { Login } from '../model/Login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  registrarUsuario(value: any) {
    throw new Error('Method not implemented.');
  }
  BASE_URL: string | undefined;

  constructor(private http: HttpClient) {
    this.BASE_URL = getConexionBackend();
  }

  getLogins(): Observable<Login[]> {
    return this.http.get<Login[]>(`${this.BASE_URL}/login/listar`);
  }
  registrarLogin(form: any) {
    return this.http.post(`${this.BASE_URL}/usuario`, form);
  }
  actualizarLogin(form: any) {
    return this.http.post(`${this.BASE_URL}/login/update`, form);
  }
  eliminarLogin(Login: Login) {
    return this.http.delete(`${this.BASE_URL}/login/delete`, {
      body: Login,
    });
  }
}