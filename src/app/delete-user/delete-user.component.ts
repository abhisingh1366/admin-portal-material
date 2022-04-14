import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  user_id = [];

  constructor(private apiService: ApiService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public userObj: any) {
    // this.getAllUsers()
  }
  ngOnInit(): void {
  }
  onDelete(): void { //Delete user Function 
    // this.data = this.http.delete('Response.body');
    let data = {
      user_id: this.userObj.id
    }
    this.apiService.deleteUser(data).subscribe((response) => {
      if (response['error'] == false) {
        this.toastr.success('User Deleted');
      } else if (response['error'] == true) {
        this.toastr.error('msg', 'Something went Wrong');
      }
    })
  }
  
}
