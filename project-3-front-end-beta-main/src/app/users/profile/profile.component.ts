import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  form: any = {
    first_name: null,
    last_name: null,
    username: null,
    email: null,
    password: null,
    address: null, 
    userImage: null,
    contact: null,
    imageUrl: null
  }
​
  editUser: User ={
    user_id: 0,
    email: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    address: '',
    userType: '',
    contact: '',
    imageUrl: '',
    userRemoved: false
  }
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  email?: string;
  address?: string;
  contact?: string;
  userImage?: string;
  showAdmin = false;
  currentUser: any;  
  flag: boolean = false;
  errorMsg = "";
  

  constructor(private token: TokenStorageService, private userService: UserService, private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
   this.isLoggedIn = !!this.token.getToken();
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.token.getUser().roles;
      this.currentUser = this.token.getUser();
    }
    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.email = user.email;
      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.address = user.address;
      this.contact = user.contact;
      this.userImage = user.userImage;
      this.password = user.password;
​


      this.showAdmin = this.roles.includes('ROLE_ADMIN');
    }
    this.editUser.user_id = this.currentUser.user_id;
    this.editUser.password = this.currentUser.password;
    this.currentUser = this.token.getUser();
   
      
  }

  getuserInfo() {
     this.userService.getAUserService(Number(sessionStorage.getItem("userId"))).subscribe(
       (response) => {
      //  this.editUser = response;
        this.editUser.user_id = response.user_id;
        this.editUser.email = response.email;
        this.editUser.username = response.username;
        this.editUser.password  = response.password;
        this.editUser.first_name = response.first_name;
        this.editUser.last_name = response.last_name;
        this.editUser.address = response.address;
        this.editUser.contact = response.contact;
         console.log(response);
       },
       (error) => {
        console.log(error);
         this.errorMsg = "ERROR GETTING USER INFOMATION!!!";
       }
     );
   }
  
  toggleAdd(){
    if(this.flag){
      this.flag = false;
    }else{
      this.flag = true;
    }
  }

  updatedUser(){
    console.log(this.editUser)
    this.editUser.user_id = this.currentUser.user_id;
    this.userService.updateUserService(this.editUser).subscribe(
      (response) => {
     this.currentUser = response      
      console.log(response);
      },
    (error)=> {
        console.log(error);
      }
    );
  }

  uploadUserImage(imageInput: any) {
    const reader = new FileReader(); console.log(reader);
    console.log(imageInput.target.files[0]);
    this.fileUploadService.onUpload(imageInput.target.files[0]).subscribe({
      next: async (response) => {
        console.log(response);
        this.form.userImage = response;  
        this.currentUser.imageUrl = response;     
      },
      error: err => {
        console.log(err);
      }
    })

  }

/* reloadPage(): void{
    window.location.reload();} */
}