import { Component, Inject, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarSimpleComponent } from '../navbar-simple/navbar-simple.component';

@Component({
  selector: 'app-guia-test',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, NgxPaginationModule, NavbarSimpleComponent],
  templateUrl: './guia-test.component.html',
  styleUrl: './guia-test.component.css',
})
export class GuiaTestComponent {
  title = 'Guia de Test';
}
