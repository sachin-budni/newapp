import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth }     from 'angularfire2/auth';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  messaging = firebase.messaging()
  currentMessage = new BehaviorSubject(null)

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }


  updateToken(token) {
    this.afAuth.authState.subscribe(user => {
      if (!user) return;

      const data = { [user.uid]: token }
      this.db.object('fcmTokens/').update(data)
    })
  }

  getPermission() {
      this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log(token)
        this.updateToken(token)
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
    }
    send(event){
      console.log(event)
      const payload = {
        notification: {
          title: "message.title",
          body: event.target.value,
          icon: "https://placeimg.com/250/250/people"
        }
      };
      this.afAuth.auth.currentUser;
    }
    receiveMessage() {
       this.messaging.onMessage((payload) => {
        console.log("Message received. ", payload);
        this.currentMessage.next(payload)
      });
    }

    googleLogin(){
      this.afAuth.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
    }
}
