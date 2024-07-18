import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarSimpleComponent } from '../navbar-simple/navbar-simple.component';

@Component({
  selector: 'opcion-usuario',
  standalone: true,
  imports: [RouterOutlet, NavbarSimpleComponent],
  templateUrl: './opcion-usuario.component.html',
  styleUrl: './opcion-usuario.component.css',
})
export class OpcionUsuarioComponent {}
