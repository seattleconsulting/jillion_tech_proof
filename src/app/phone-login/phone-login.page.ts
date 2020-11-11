import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import firebase from 'firebase';

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.page.html',
  styleUrls: ['./phone-login.page.scss'],
})
export class PhoneLoginPage implements OnInit {
  recaptchaVerifier
  :firebase.auth.RecaptchaVerifier;
  phoneNumber = 81;

  constructor(public navCtrl: NavController, private router: Router, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

  signIn(phoneNumber: number){
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+" + phoneNumber;
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then( async (confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        let prompt = await this.alertCtrl.create({
        //title: 'Enter the Confirmation code',
        inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
        buttons: [
          { text: 'Cancel',
            handler: data => { console.log('Cancel clicked'); }
          },
          { text: 'Send',
            handler: data => {
              confirmationResult.confirm(data.confirmationCode)
              .then(function (result) {
                // User signed in successfully.
                console.log(result.user);
                //this.navCtrl.navigateRoot('room');
                // ...
              }).catch(function (error) {
                // User couldn't sign in (bad verification code?)
                console.log(error);
                // ...
              });
            }
          }
        ]
      });
      await prompt.present();
    })
    .catch(function (error) {
      console.error("SMS not sent", error);
    });
  
  }
}
