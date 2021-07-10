import { DeleteItemComponent } from './delete-item/delete-item.component';
import { TambahItemComponent } from './tambah-item/tambah-item.component';
import { AnalogKuComponent } from './analog-ku/analog-ku.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { MaterialDesign } from '../material/material';
import { FormsModule } from '@angular/forms';
import { KontakComponent } from './kontak/kontak.component';
import { DetailItemComponent } from './detail-item/detail-item.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'camera-analog',
        component: AnalogKuComponent,
      },
      {
        path: 'kontak',
        component: KontakComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/admin/camera-analog',
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    KontakComponent,
    AnalogKuComponent,
    TambahItemComponent,
    DetailItemComponent,
    DeleteItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialDesign,
    FormsModule,
  ],
})
export class AdminModule {}
