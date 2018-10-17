import { Component } from '@angular/core';
import { MessagingService } from './messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message;

  constructor(private msgService: MessagingService) {}
  signIn(){
    this.msgService.googleLogin();
  }
  sendMessage(event){
    this.msgService.send(event);
  }
  ngOnInit() {
    this.msgService.getPermission()
    this.msgService.receiveMessage()
    this.message = this.msgService.currentMessage
  }
}
