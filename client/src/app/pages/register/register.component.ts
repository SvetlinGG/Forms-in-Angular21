import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule} from '@angular/forms'



interface LoginData {
  email: string,
  password: string
}


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  
})
export class RegisterComponent {

  name = new FormControl('');
  
  
  updateName(){
    this.name.setValue('SvetlinGG');

    console.log(this.name);
    

  }
  

}
