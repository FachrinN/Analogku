import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

export interface Item {
  idItem: string;
  merkCamera: string;
  tipeCamera: string;
  kelengkapan: string;
  harga: string;
  lokasi: string;
  penjual: string;
}

@Component({
  selector: 'app-tambah-item',
  templateUrl: './tambah-item.component.html',
  styleUrls: ['./tambah-item.component.scss'],
})
export class TambahItemComponent implements OnInit {
  userData: any = {};
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  user: any = {};
  constructor(
    public dialogRef: MatDialogRef<TambahItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public afs: AngularFirestore,
    public auth: AngularFireAuth,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.auth.user.subscribe((res) => {
      this.userData = res;
    });
  }

  // fungsi untuk menyimpan data
  simpan() {
    if (this.data.id == undefined) {
      //mengambil data date lalu diubah ke string
      const doc = new Date().getTime().toString();
      this.data.uid = this.userData.uid;
      this.afs
        // menyimpan data ke koleksi minums
        .collection('analog')
        // menjadikan data waktu tadi menjadi id document
        .doc(doc)
        .set(this.data)
        .then((res) => {
          this.snackbar.open(
            'Selamat pesanan anda berhasil ditambahkan!',
            'close',
            {
              verticalPosition: this.verticalPosition,
            }
          );
        })
        .catch((err) => {
          this.snackbar.open('Pesanan tidak dapat dibuat', 'close', {
            verticalPosition: this.verticalPosition,
          });
          console.log(err);
        });
    } else {
      // mengambil data waktu lalu menjadikanya string
      const doc = new Date().getTime().toString();
      this.data.uid = this.userData.uid;
      this.afs
        .collection('analog')
        .doc(this.data.id)
        .update(this.data)
        .then((res) => {
          this.snackbar.open('Pesanan berhasil diubah!', 'close', {
            verticalPosition: this.verticalPosition,
          });
        })
        .catch((err) => {
          console.log(err);
          this.snackbar.open('Pesanan gagal diubah!', 'close', {
            verticalPosition: this.verticalPosition,
          });
        });
    }
  }
}
