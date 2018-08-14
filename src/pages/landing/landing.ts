import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  Loading,
  LoadingController
} from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider
  ) { }

  goToLogin(): void { this.navCtrl.push('LoginPage'); }

  goToSignup(): void { this.navCtrl.push('SignupPage'); }

  goToBillList(): void {
    this.authProvider.anonymousLogin().then(newUser => {
      loading.dismiss().then(() => {
        this.navCtrl.setRoot(HomePage);
      });
    }).catch(error => {
      loading.dismiss().then(() => {
        console.error("goToBillList ",error);
      });
    });

    const loading: Loading = this.loadingCtrl.create();
    loading.present();
  }

}
