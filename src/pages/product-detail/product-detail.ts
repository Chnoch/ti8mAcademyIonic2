import {Component, Input} from '@angular/core';
import {NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {OpenFoodApi} from "../../services/api/OpenFoodApi";
import {Product} from "../../services/model/Product";

@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html'
})
export class ProductDetailPage {

  private showInRecents: boolean;

  private barcode: number;
  private product: Product;
  private loader;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private openFoodApi: OpenFoodApi, private loadingCtrl: LoadingController,
              private toastCtrl: ToastController, private storage: Storage) {
  }

  ionViewWillEnter() {
    this.barcode = this.navParams.get('barcode');
    this.showInRecents = this.navParams.get('showInRecents');
    
    this.loader = this.loadingCtrl.create({
      content: "Bitte warten"
    });

    this.loader.present();

    this.openFoodApi.listProducts(["images", "nutrients"], [this.barcode])
      .subscribe(res => {
        this.loader.dismiss();

        if (res.data.length == 0) {
          this.showError();
          return;
        }

        this.product = res.data[0];

        if (this.showInRecents) {
          this.storeProduct();
        }
      }, err => {
        this.loader.dismiss();
        this.showError()
      });
  }

  private storeProduct() {
    this.storage.ready().then(() => {
      let product = {
        name: this.product.attributes.name,
        barcode: this.product.attributes.barcode,
        image: this.product.attributes.images[0].medium
      };
      this.storage.get('recents').then((recents) => {
        if (recents == null) {
          recents = [];
        }

        recents.unshift(product);
        recents = recents.splice(0, 5);

        this.storage.set('recents', recents);
      });
    });
  }

  private showError() {
    let toast = this.toastCtrl.create({
      message: 'Produkt wurde nicht gefunden',
      duration: 3000
    });
    toast.present();
    this.navCtrl.pop();
  }

}
