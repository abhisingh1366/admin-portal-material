import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  selectFormControl = new FormControl('', Validators.required); 
  first_name = new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(20)]);
  last_name = new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(20)])
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',[Validators.required,Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]);
  username = new FormControl('', [Validators.required]);
  sponsor_id = new FormControl('ZS2Oez0');

  hide = true;
  user : any = {};
  constructor( private fb: FormBuilder , private apiService : ApiService , 
     private router: Router , private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      username: this.username,
      sponsor_id: this.sponsor_id
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required') || this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '' && this.password.hasError('password') ? 'Not a valid password' : '';
  }

  submit(){
    console.log(this.registerForm.value)
    this.apiService.register(this.registerForm.value).subscribe((response : any) => {
      console.log(response)
      if(response['error'] == false){
        this.toastr.success('Registered in Successfully');
        console.log('Success',response)
        this.router.navigate(['/login'])
        // alert('Logged in Successfully');
      }
      else if(response['error'] == true){
        this.toastr.error('msg');
        console.log('error',response)
        // alert('Wrong Password or Id')
      }
    })
  }
}
