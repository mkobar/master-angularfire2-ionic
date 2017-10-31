import { Component } from '@angular/core';
import {
  NavController,
  ActionSheet,
  ActionSheetController,
  Platform
} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { BillProvider } from '../../providers/bill/bill';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public billList: Observable<any>;
  constructor(
    public navCtrl: NavController,
    public actionCtrl: ActionSheetController,
    public platform: Platform,
    public billProvider: BillProvider
  ) {}

  ionViewDidLoad() {
    this.billList = this.billProvider.getBillList().valueChanges();
  }

  createBill(): void {
    this.navCtrl.push('BillCreatePage');
  }

  goToPaidBill(billId: string): void {
    this.navCtrl.push('BillDetailPage', { billId: billId });
  }

  moreBillOptions(billId): void {
    let action: ActionSheet = this.actionCtrl.create({
      title: 'Modify your bill',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.billProvider.removeBill(billId);
          }
        },
        {
          text: 'More details',
          icon: !this.platform.is('ios') ? 'play' : null,
          handler: () => {
            this.navCtrl.push('BillDetailPage', { billId: billId });
          }
        },
        {
          text: 'Mark as Paid!',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            this.billProvider.payBill(billId);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    action.present();
  }
}
