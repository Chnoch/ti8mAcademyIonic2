import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ProductDetailPage} from "../pages/product-detail/product-detail";
import {OpenFoodApi} from "../services/api/OpenFoodApi";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductDetailPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: OpenFoodApi, useClass: OpenFoodApi}
  ]
})
export class AppModule {
}
