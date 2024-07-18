import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarSimpleComponent } from '../navbar-simple2/navbar-simple2.component';

@Component({
  selector: 'opcion-especialista',
  standalone: true,
  imports: [RouterOutlet, NavbarSimpleComponent],
  templateUrl: './opcion-especialista.component.html',
  styleUrl: './opcion-especialista.component.css',
})
export class OpcionEspecialistaComponent {}
