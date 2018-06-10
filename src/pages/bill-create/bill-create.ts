import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillProvider } from '../../providers/bill/bill';

@IonicPage()
@Component({
  selector: 'page-bill-create',
  templateUrl: 'bill-create.html'
})
export class BillCreatePage {
  public newBillForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    formBuilder: FormBuilder,
    public billProvider: BillProvider
  ) {
    this.newBillForm = formBuilder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  createBill() {
    if (!this.newBillForm.valid) {
      console.log(this.newBillForm.value);
    } else {
      this.billProvider
        .createBill(
          this.newBillForm.value.name,
          this.newBillForm.value.amount,
          this.newBillForm.value.dueDate
        )
        .then(
          () => {
            this.navCtrl.pop();
          },
          error => {
            console.log(error);
          }
        );
    }
  }
}