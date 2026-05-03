import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);

  errorMessage = signal('');
  isSubmitted = signal(false);

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  get username(){
    return this.registerForm.get('username');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password')
  }


  register(): void{

    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');
    this.isSubmitted.set(true);

    const { username, email, password } = this.registerForm.getRawValue();

    this.auth.register({
      username: username || '',
      email: email || '',
      password: password || ''
    }).subscribe({
      next: () => {
        this.isSubmitted.set(false);
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        this.isSubmitted.set(false);
        this.errorMessage.set(err?.error?.message || 'Register failed')
      }
    });

  }
  

}
