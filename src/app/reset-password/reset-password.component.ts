import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { ConfirmedValidator } from '../_helper/confirmed.validator';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    
    public resetForm: FormGroup = this.formBuilder.group({
      forgotten_password_code: ['', Validators.required],
      newPassword: ['', [Validators.required , Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confPassword: ['', [Validators.required]]
      }, { 
        validator: ConfirmedValidator('newPassword', 'confPassword')
      });

   token : any;
   hide = true;
  get resetF() {
    return this.resetForm.controls;
  }
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, 
    private apiService: ApiService , private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.resetForm.get('forgotten_password_code')?.markAsDirty();
    this.resetForm.get('newPassword')?.markAsDirty();
    this.resetForm.get('confPassword')?.markAsDirty();
    let data = {
      forgotten_password_code : this.resetForm.value.forgotten_password_code,
      newPassword : this.resetForm.value.newPassword,
      confPassword : this.resetForm.value.confPassword
    }
    this.token = localStorage.getItem('Token');
    console.log(data)
    this.apiService.reset(data, this.token).subscribe((response : any) => {
      console.log(`token: ${this.token}`)
      if(response['error'] == false){
        this.toastr.success('Success','Password is Reset Successfully');
        this.router.navigate(['/login']);
      }else if(response['error'] == true){
        this.toastr.error('Error','Fields Required or Password or Otp does not match')
        // this.resetForm.reset();
      }
    })
   
    // let user = localStorage.getItem("Token" , JSON.parse(this.user));
  }
  getErrorMessage() {
    if (this.resetForm.controls['forgotten_password_code'].hasError('required') && this.resetForm.controls['newPassword'].hasError('required') && this.resetForm.controls['confPassword'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.resetForm.controls['newPassword'].hasError('password') ? 'Not a valid email' : ''  && this.resetForm.controls['confPassword'].hasError('password') ? 'Password format is incorrect' : '';
  } 
}