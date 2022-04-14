import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  //  forgetForm!: FormGroup;
  // email = new FormControl('', [Validators.required, Validators.email]);
  public forgetForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    });

  token: any = {};
  
  get forgetF() {
    return this.forgetForm.controls;
  }
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient , 
    private authService : AuthService , private apiService : ApiService , private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let data = {
      "email": this.forgetForm.value.email,
    }

    this.apiService.forgot(data).subscribe((Response : any) => {
    this.token = Response.body[0].token;
      localStorage.setItem('Token',this.token);

      console.log('tokens',this.token)
      if(Response['error'] == false){
        this.toastr.success('Redirected to Reset')
        this.router.navigate(['/reset-password']);
      }
      else if(Response['error'] == true){
        this.toastr.error('User Does\'t Exist')
      }
    })
    console.log(this.forgetForm);
  }

  getErrorMessage() {
    if (this.forgetForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.forgetForm.controls['email'].hasError('email') ? 'Not a valid email' : '' ;
  }
} 
