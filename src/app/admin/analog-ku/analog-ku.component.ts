import { DeleteItemComponent } from './../delete-item/delete-item.component';
import { DetailItemComponent } from './../detail-item/detail-item.component';
import { TambahItemComponent } from './../tambah-item/tambah-item.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-analog-ku',
  templateUrl: './analog-ku.component.html',
  styleUrls: ['./analog-ku.component.scss'],
})
export class AnalogKuComponent implements OnInit {
  analog: any = {};
  analogs: any = [];
  userData: any = {};
  user: any = {};
  idx: any;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    public dialog: MatDialog,
    public auth: AngularFireAuth,
    public db: AngularFirestore,
    public sb: MatSnackBar
  ) {}

  ngOnInit() {
    // indentifikasi user
    this.auth.user.subscribe((user) => {
      this.userData = user;
      this.getItem();
    });
  }

  // Mengambil data pesanan user
  getItem() {
    this.db
      .collection('analog', (ref) => {
        return ref.where('uid', '==', this.userData.uid);
      })
      .valueChanges({ idField: 'id' })
      .subscribe(
        (res) => {
          console.log(res);
          this.analogs = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  // Menambahkan data
  tambahItem(data: any, idx: any) {
    let dialog = this.dialog.open(TambahItemComponent, {
      width: '450px',
      data: data,
    });
  }

  // Melihat detail pesanan
  detailItem(data: any, idx: any) {
    let dialog = this.dialog.open(DetailItemComponent, {
      width: '450px',
      data: data,
    });

    dialog.afterClosed().subscribe((res) => {
      console.log('card ditutup');
    });
  }

  // Menghapus pesanan
  deleteItem(analogs: any, idx: any) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.db
          .collection('analog')
          .doc(analogs.id)
          .delete()
          .then((res) => {
            this.sb.open('Pesanan berhasil dihapus', 'close', {
              verticalPosition: this.verticalPosition,
            });
          })
          .catch((err) => {
            this.sb.open(
              'Silahkan coba lagi, Pesanan tidak dapat dihapus',
              'close',
              {
                verticalPosition: this.verticalPosition,
              }
            );
          });
      }
    });
  }
}
