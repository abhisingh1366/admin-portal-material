import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  /*------------------------------------------------Stepper Form------------------------------------------------------*/
  firstFormGroup!: FormGroup;
  first_name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  last_name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);

  secondFormGroup!: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]);
  username = new FormControl('', [Validators.required]);

  thirdFormGroup!: FormGroup;
  sponsor_id = new FormControl('ZS2Oez0');
  
  isLinear = true;





  /*-----------------------------------------------------Normal Form-------------------------------------------------*/
  registerForm!: FormGroup;
  // selectFormControl = new FormControl('', Validators.required); 
  // first_name = new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(20)]);
  // last_name = new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(20)])
  // email = new FormControl('', [Validators.required, Validators.email]);
  // password = new FormControl('',[Validators.required,Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]);
  // username = new FormControl('', [Validators.required]);
  // sponsor_id = new FormControl('ZS2Oez0');

  hide = true;
  user: any = {};
  constructor(private fb: FormBuilder, private apiService: ApiService,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      firstFormGroup : this.fb.group({
        first_name: this.first_name,
        last_name: this.last_name
      }),
  
      secondFormGroup : this.fb.group({
        email: this.email,
        username: this.username,
        password: this.password
      }),
  
      thirdFormGroup : this.fb.group({
        sponsor_id: this.sponsor_id
      })
    });

    // this.registerForm = this.fb.group({
    //   first_name: this.first_name,
    //   last_name: this.last_name,
    //   email: this.email,
    //   password: this.password,
    //   username: this.username,
    //   sponsor_id: this.sponsor_id
    // });
  }

  getErrorMessage() {
    if (this.email.hasError('required') || this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '' && this.password.hasError('password') ? 'Not a valid password' : '';
  }

  submit() {
    let form1 = this.registerForm.value.firstFormGroup;
    let form2 = this.registerForm.value.secondFormGroup;
    let form3 = this.registerForm.value.thirdFormGroup

    let finalValue = {...form1,...form2,...form3}
    console.log('Final Value',finalValue)
    // console.log(this.registerForm.value)
    this.apiService.register(finalValue).subscribe((response: any) => {
      console.log(response)
      if (response['error'] == false) {
        this.toastr.success('Registered in Successfully');
        console.log('Success', response)
        this.router.navigate(['/login'])
        // alert('Logged in Successfully');
      }
      else if (response['error'] == true) {
        this.toastr.error('msg');
        console.log('error', response)
        // alert('Wrong Password or Id')
      }
    })
  }
}
