import { Component, OnInit, Renderer2, ViewChild, ElementRef  } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chats: any;
  activeUsers:any;
  messages:any;
  allMessage = [];
  currentusers:any;
  users: Subscription;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  constructor(private chatService: ChatService, private renderer:Renderer2) { }

  ngOnInit() {
    this.scrollToBottom();
    this.chatService.activeUsers.subscribe((result) => {
      this.currentusers = result;
    });

    this.chatService.messages.subscribe((result) => {
      this.allMessage.push(result);
    });

    

    }
    addData = {
      message:''
   }
   createMessages(){
      this.chatService.createMessages(this.addData);
      this.addData = {
        message:''
     }
    }

    ngAfterViewChecked() {        
      this.scrollToBottom();        
  } 
  
    scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
  }
  }
