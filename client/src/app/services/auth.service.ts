import { computed, Injectable, signal } from '@angular/core';
import { AuthUser } from '../models/auth-user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root'})
export class AuthService {

  private apiUrl = 'http://localhost:27017/api/chat';

  user = signal<AuthUser | null>(this.getUserFromStorage());
  isLoggedIn = computed(() => !!this.user())

  constructor(private http: HttpClient) { }

  


  private getUserFromStorage(): AuthUser | null{
    const rawUser = localStorage.getItem('user');
    return rawUser ? JSON.parse(rawUser) : null;
  }
}
