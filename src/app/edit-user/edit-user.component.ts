import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup , FormBuilder} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editForm: FormGroup = this.formBuilder.group({
    first_name: [''],
    last_name: [''],
    username: [''],
    email: ['']
  })
  userObj: any;
  user_id: any;
  constructor( private apiService : ApiService , private toastr : ToastrService , private formBuilder : FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: any ) {

     }
  
  
  ngOnInit(): void {
    this.setFormValues(this.data)
  }
  public setFormValues(user: any) {  //patch value function
    if (user != null) {
      this.editForm.patchValue({
        username: !!user.username ? user.username : '',
        email: !!user.email ? user.email : '',
        first_name: !!user.first_name ? user.first_name : '',
        last_name: !!user.last_name ? user.last_name : '',

      })
    }
  }
  onEdit() {   //Edit User Function
    

    let data = {
      "username": this.editForm.value.username,
      "email": this.editForm.value.email,
      "first_name": this.editForm.value.first_name,
      "last_name": this.editForm.value.last_name
    }
    this.apiService.updateUser(data).subscribe((response) => {
      if (response['error'] == false) {
        this.toastr.success('Congrats', 'User Updated Successfully');
      }
      else if (response['error'] == true) {
        this.toastr.error('msg', 'Something is Wrong');
      }
    })
  }
}
