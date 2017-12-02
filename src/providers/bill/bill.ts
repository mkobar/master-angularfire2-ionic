import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class BillProvider {
  public billList: AngularFireList<any>;
  public userId: string;

  constructor(
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe(user => {
      this.userId = user.uid;
      this.billList = this.afDatabase.list(`/userProfile/${user.uid}/billList`);
    });
  }

  getBillList(): AngularFireList<any> {
    return this.billList;
  }

  getBill(billId: string): AngularFireObject<any> {
    return this.afDatabase.object(
      `/userProfile/${this.userId}/billList/${billId}`
    );
  }

  createBill(
    name: string,
    amount: number,
    dueDate: string = null,
    paid: boolean = false
  ): Promise<any> {
    const newBillRef: firebase.database.ThenableReference = this.billList.push(
      {}
    );
    return newBillRef.set({
      name,
      amount,
      dueDate,
      paid,
      id: newBillRef.key
    });
  }

  removeBill(billId: string): Promise<any> {
    return this.billList.remove(billId);
  }

  payBill(billId: string): Promise<any> {
    return this.billList.update(billId, { paid: true });
  }

  takeBillPhoto(billId: string, imageURL: string): any {
    const storageRef: firebase.storage.Reference = firebase
      .storage()
      .ref(`${this.userId}/${billId}/billPicture/`);
    return storageRef
      .putString(imageURL, 'base64', {
        contentType: 'image/png'
      })
      .then(pictureSnapshot => {
        this.billList.update(billId, { picture: pictureSnapshot.downloadURL });
      })
      .catch(error => {
        console.error(error);
      });
  }
}
