import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('mymodal') content!: ElementRef;
  @ViewChild('mymodal1') deleteContent!: ElementRef;
  data: any;

  title = 'appBootstrap';

  closeResult: string = '';

  editForm: FormGroup = this.formBuilder.group({
    first_name: [''],
    last_name: [''],
    username: [''],
    email: ['']
  })


  user_id = [];
  profilePic = [];
  userObj: any;


  displayedColumns: string[] = ['id', 'username', 'email', 'first_name', 'last_name', 'profile_picture', 'country_name', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private http: HttpClient, private authService: AuthService, private activeRoute: ActivatedRoute, private router: Router
    , private apiService: ApiService, private dialog: MatDialog, private modalService: NgbModal, private toastr: ToastrService, private formBuilder: FormBuilder) {
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.apiService.getAllUsers(this.user_id).subscribe((res: any) => {
      // this.dataSource = res.body;
      console.log('datasource', this.dataSource)
      this.dataSource = new MatTableDataSource(res.body);
      this.dataSource.paginator = this.paginator;
      // console.log('response:',res);
    })
  }
  getAllUsers() {
    this.apiService.getAllUsers(this.user_id).subscribe((response: any) => {
      if (response == false) {

        this.data = response.body;
      }
    });
    this.ngOnInit();
  }

  public setFormValues(user: any) {  //patch value function
    if (user != null) {
      console.log("setFormValues", user);
      this.editForm.patchValue({
        username: !!user.usernamename ? user.username : '',
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
    this.editForm.patchValue({ username: this.userObj.username });
    this.editForm.patchValue({ email: this.userObj.email });
    this.editForm.patchValue({ first_name: this.userObj.first_name });
    this.editForm.patchValue({ last_name: this.userObj.last_name });

    this.apiService.updateUser(data).subscribe((response) => {
      if (response['error'] == false) {
        this.toastr.success('Congrats', 'User Updated Successfully');
        this.modalService.dismissAll();
        this.getAllUsers()
      }
      else if (response['error'] == true) {
        this.toastr.error('msg', 'Something is Wrong');
      }
    })
  }

  onDelete(): void { //Delete user Function 
    // this.data = this.http.delete('Response.body');
    let data = {
      user_id: this.userObj.id
    }
    this.apiService.deleteUser(data).subscribe((response) => {
      if (response['error'] == false) {
        this.toastr.success('User Deleted');
        this.getAllUsers();
      } else if (response['error'] == true) {
        this.toastr.error('msg', 'Something went Wrong');
      }
    })
  }

  getUserById() {
    this.apiService.getUserById(this.user_id).subscribe((response: any) => {
      if (response == false) {
        this.router.navigate(['/getAllUsers']);
      }
    })
  }

  //--------------------------------------------------------Pop Up code ahead------------------------------------------------------------------------------
  /**
   * Write code on Method
  *
  * @return response()
  */
  openDialog(user: any) {
    console.log(user)
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: user,
    })
    console.log('dialog', dialogRef)
    this.userObj = user;
    //  this.editForm.patchValue({username : user.username},{first_name : user.first_name}
    //  )

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllUsers();
    });
  }
  deleteDialog(user?: any) {
    console.log('delete Dialog', user)
    this.userObj = user;
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: user,
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllUsers();
    });
  }
  // open(user?: any) {   ///Edit User Pop up

  //   console.log('modeledit', user)
  //   this.userObj = user;
  //   this.editForm.patchValue({
  //     username: this.userObj.username,
  //     email: this.userObj.email,
  //     first_name: this.userObj.first_name,
  //     last_name: this.userObj.last_name
  //   })
  //   this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason: any) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // deletePopUp(user?: any) {   //delete user Popup

  //   console.log('modeldelete', user)
  //   this.userObj = user;
  //   this.modalService.open(this.deleteContent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason: any) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  /**
   * Write code on Method
   *
   * @return response()
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
