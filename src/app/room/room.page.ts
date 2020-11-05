import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import firebase from 'firebase';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {
  rooms = [];

  constructor(public navCtrl: NavController,
    public alertController: AlertController) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref('chatrooms/').on('value', resp => {
          if (resp) {
            this.rooms = [];
            resp.forEach(childSnapshot => {
              const room = childSnapshot.val();
              room.key = childSnapshot.key;
              this.rooms.push(room);
            });
          }
        });
      } else {
        this.navCtrl.navigateRoot('signin');
      }
    });
  }

  joinRoom(key) {
    this.navCtrl.navigateRoot('chat/' + key);
  }

  async signOut() {
    try {
      await firebase.auth().signOut();
      this.navCtrl.navigateRoot('signin');
    } catch (error) {}
  }

}
