import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private apiUrl = 'https://localhost:7281/api/chatbot'; // .NET Core backend API URL

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const body = { text: message };
    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
