import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private apiUrl = 'http://localhost:5251/api/chatbot'; // .NET Core backend API URL

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { message });
  }
}
