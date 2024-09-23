import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ChatbotService } from './chatbot/chatbot.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatbotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ChatbotService]
})
export class AppComponent {
  title = 'chat-application';
}
