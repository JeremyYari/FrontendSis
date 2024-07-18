import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule,FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { NavbarSimpleComponent } from '../navbar-simple2/navbar-simple2.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [NgForOf, CommonModule, FormsModule, NavbarSimpleComponent, RouterOutlet, ReactiveFormsModule],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usuarios: any[] = [];
  selectedUser: any = null;
  userForm: FormGroup;
  updateSuccess: boolean = false;
  deleteSuccess: boolean = false;
  updateError: string = '';

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      usuario_id: [''],
      correo: [''],
      nombre: [''],
      apellidos: [''],
      fecha_nacimiento: ['']
    });
  }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.http.get<any[]>('http://localhost:5000/usuarios-tipo1').subscribe(data => {
      this.usuarios = data;
    });
  }

  seleccionarUsuario(usuario: any) {
    this.selectedUser = usuario;
    this.userForm.patchValue(usuario);
  }

  actualizarUsuario() {
    if (this.selectedUser) {
      const usuarioId = this.selectedUser.usuario_id;
      this.http.put<any>(`http://localhost:5000/usuario/${usuarioId}`, this.userForm.value).subscribe(response => {
        this.updateSuccess = response.success;
        if (this.updateSuccess) {
          this.updateError = '';
          this.obtenerUsuarios();
        } else {
          this.updateError = response.error;
        }
      });
    }
  }

  eliminarUsuario() {
    if (this.selectedUser) {
      const usuarioId = this.selectedUser.usuario_id;
      this.http.delete<any>(`http://localhost:5000/usuario/${usuarioId}`).subscribe(response => {
        this.deleteSuccess = response.success;
        if (this.deleteSuccess) {
          this.obtenerUsuarios();
          this.userForm.reset();
          this.selectedUser = null;
        }
      });
    }
  }
}