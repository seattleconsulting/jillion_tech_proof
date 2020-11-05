import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.page.html',
  styleUrls: ['./add-room.page.scss'],
})
export class AddRoomPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
}
