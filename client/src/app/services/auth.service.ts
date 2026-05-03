import { computed, Injectable, signal } from '@angular/core';
import { AuthUser } from '../models/auth-user.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class AuthService {

  private apiUrl = 'http://localhost:27017/api/chat';

  user = signal<AuthUser | null>(this.getUserFromStorage());
  isLoggedIn = computed(() => !!this.user())

  constructor(private http: HttpClient) { }

  register(data: {username: string, email: string, password: string}){
    return this.http.post<AuthUser>(`${this.apiUrl}/register`, data).pipe(
      tap((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.user.set(user)
      })
    );
  }

  


  private getUserFromStorage(): AuthUser | null{
    const rawUser = localStorage.getItem('user');
    return rawUser ? JSON.parse(rawUser) : null;
  }
}
