import { Component } from '@angular/core';
import { ChatbotService } from './chatbot.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  userMessage: string = '';
  messages: { text: string, isUser: boolean }[] = [];

  constructor(private chatbotService: ChatbotService) { }
  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ text: this.userMessage, isUser: true });

      // Call the backend to get the bot response
      this.chatbotService.sendMessage(this.userMessage).subscribe((response: any) => {
        this.messages.push({ text: response.reply, isUser: false });
      });

      // Clear the input field
      this.userMessage = '';
    }
  }
}