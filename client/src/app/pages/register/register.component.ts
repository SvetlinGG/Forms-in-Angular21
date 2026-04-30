import { Component, NgModule, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('registerForm') form: NgForm | undefined;

  formSubmitHandler(nameInput: HTMLInputElement, emailInput: HTMLInputElement){

    const form = this.form


    console.log(nameInput);
    console.log(emailInput);
    
    form?.reset()

  }

}
