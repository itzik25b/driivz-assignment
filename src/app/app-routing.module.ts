import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IssMapComponent} from "./iss-map/iss-map/iss-map.component";

const routes: Routes = [
  { path: '', redirectTo: '/iss-map', pathMatch: 'full' },
  { path: 'iss-map', component: IssMapComponent },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
