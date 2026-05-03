import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class AuthService {

  private apiUrl = 'http://localhost:27017/api/chat';

  user = signal

  constructor() { }
}
