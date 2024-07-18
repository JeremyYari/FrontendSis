import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NavbarSimpleComponent } from '../navbar-simple2/navbar-simple2.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-heatmap',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, MatTableModule, ReactiveFormsModule, NavbarSimpleComponent,RouterOutlet],
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {
  heatmapData: any[] = [];
  displayedColumns: string[] = ['nombre', 'apellidos', 'puntaje', 'resultado', 'comentarios', 'acciones'];
  commentsForm!: FormGroup;

  center: google.maps.LatLngLiteral = { lat: -11.8261257, lng: -77.1197233 };
  zoom = 10;
  options: google.maps.MapOptions = {
    maxZoom: 15,
    minZoom: 8,
  };

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.http.get<any>('http://127.0.0.1:5000/heatmap').subscribe(data => {
      this.heatmapData = data.heatmap.map((item: any, index: number) => ({
        ...item,
        position: {
          lat: parseFloat(item.coordenadas.split(',')[0]) + index * 0.0001,
          lng: parseFloat(item.coordenadas.split(',')[1]) + index * 0.0001
        },
        title: `${item.nombre} ${item.apellidos}`
      }));
      this.createCommentsForm();
    });
  }

  createCommentsForm() {
    this.commentsForm = this.fb.group({
      comments: this.fb.array(this.heatmapData.map(item => new FormControl(item.comentarios || '')))
    });
  }

  get comments(): FormArray {
    return this.commentsForm.get('comments') as FormArray;
  }

  getCommentControl(index: number): FormControl {
    return this.comments.at(index) as FormControl;
  }

  saveComment(index: number) {
    const comment = this.getCommentControl(index).value;
    const resultadoId = this.heatmapData[index].resultado_id;

    this.http.put(`http://127.0.0.1:5000/actualizar-comentarios/${resultadoId}`, { comentarios: comment }).subscribe(response => {
      console.log(response);
    });
  }
}
