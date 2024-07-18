import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { RouterOutlet } from '@angular/router';
import { NavbarSimpleComponent } from '../navbar-simple/navbar-simple.component';

@Component({
  selector: 'app-escoger-rol',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NavbarSimpleComponent, HttpClientModule],
  templateUrl: './escoger-rol.component.html',
  styleUrl: './escoger-rol.component.css'
})
export class EscogerRolComponent {}