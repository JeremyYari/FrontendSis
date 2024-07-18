import { Routes } from '@angular/router';
import { PrincipalComponent } from './component/principal/principal.component';
import { RegistrarUsuarioComponent } from './component/registrar-usuario/registrar-usuario.component';
import { GuiaTestComponent } from './component/guia-test/guia-test.component';
import { TestAnsiedadComponent } from './component/test-ansiedad/test-ansiedad.component';
import { LoginComponent } from './component/login/login.component';
import { EscogerRolComponent } from './component/escoger-rol/escoger-rol.component';
import { Login2Component } from './component/login2/login2.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { OpcionUsuarioComponent } from './component/opcion-usuario/opcion-usuario.component';
import { OpcionEspecialistaComponent } from './component/opcion-especialista/opcion-especialista.component';
import { ResultadosComponent } from './component/resultados/resultados.component';
import { HeatmapComponent } from './component/heatmap/heatmap.component';

export const routes: Routes = [
  { path: '', redirectTo: '/principal', pathMatch: 'full' }, //Indicamos que ni bien se ejecuta,se tenga la pagina1 de entrada
  { path: 'principal', component: PrincipalComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'guia-test', component: GuiaTestComponent },
  { path: 'test-ansiedad', component: TestAnsiedadComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login2', component: Login2Component },
  { path: 'escoger-rol', component: EscogerRolComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'opcion-usuario', component: OpcionUsuarioComponent},
  { path: 'resultados', component: ResultadosComponent},
  { path: 'heatmap' , component: HeatmapComponent},
  { path: 'opcion-especialista', component: OpcionEspecialistaComponent}
];
