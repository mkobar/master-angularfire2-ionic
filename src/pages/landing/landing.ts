import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  Loading,
  LoadingController,
  Alert,
  AlertController
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
    public alertCtrl: AlertController,
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
        const alert: Alert = this.alertCtrl.create({
          message: "error: "+error,
          buttons: [
            { text: 'Cancel' },
            {
              text: 'OK',
              handler: data => {
                this.navCtrl.push('LandingPage');
              }
            }
          ]
        });
        alert.present()
      });
    });

    const loading: Loading = this.loadingCtrl.create();
    loading.present();
  }

}
