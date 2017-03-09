import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {BarcodeScanner, Vibration} from "ionic-native";
import {Storage} from '@ionic/storage';

import {ProductDetailPage} from "../product-detail/product-detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private barcodes: Array<number> = [7613269300748, 7617400030716,
    4104420034167, 7613269018421, 87157420];
  private recents = [];

  constructor(public navCtrl: NavController, private storage: Storage) {
  }

  ionViewWillEnter() {
    this.storage.ready().then(() => {
      this.storage.get('recents').then(val => this.recents = val);
    });
  }

  scan($event) {
    BarcodeScanner.scan().then(result => {
      if (!result.cancelled) {
        Vibration.vibrate(1000);
        let barcode = result.text;
        // use barcode
        this.open(barcode, true);
      }
    }).catch(err => {
      console.log('Error: ' + err + '; Using Fallback mechanism');
      let bc = this.barcodes[Math.floor(Math.random() * this.barcodes.length)];
      this.open(bc, true);
    });
  }

  open(barcode, showInRecents) {
    console.log('barcode: ' + barcode);
    console.log('showInRecents: ' + showInRecents);
    this.navCtrl.push(ProductDetailPage, {barcode: barcode, showInRecents: showInRecents});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
}
