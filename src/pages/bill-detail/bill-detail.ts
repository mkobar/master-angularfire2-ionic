import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheet,
  ActionSheetController,
  Platform,
  Alert,
  AlertController
} from 'ionic-angular';
import { BillProvider } from '../../providers/bill/bill';
import { Observable } from 'rxjs/Observable';

@IonicPage({
  segment: 'bill/:billId'
})
@Component({
  selector: 'page-bill-detail',
  templateUrl: 'bill-detail.html'
})
export class BillDetailPage {
  public bill: {};
  public billId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionCtrl: ActionSheetController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public billProvider: BillProvider
  ) { }

  ionViewDidEnter() {
    this.billId = this.navParams.get('billId');
    this.billProvider
      .getBill(this.billId)
      .valueChanges()
      .subscribe(bill => {
        this.bill = bill;
      });
  }

  showOptions(billId): void {
    const action: ActionSheet = this.actionCtrl.create({
      title: 'Modify your bill',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.billProvider.removeBill(billId).then(() => {
              this.navCtrl.pop();
            });
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