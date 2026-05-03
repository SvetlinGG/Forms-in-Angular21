import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule} from '@angular/forms'
import { Router, RouterLink } from '@angular/router';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router)

  register(){

  }
  

}
