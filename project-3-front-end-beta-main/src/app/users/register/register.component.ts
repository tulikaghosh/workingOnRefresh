import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any = {
    first_name: null,
    last_name: null,
    username: null,
    email: null,
    password: null,
    address: null, 
    userImage: [''],
    contact: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  constructor(private authService: AuthService, private router: Router, private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { first_name, last_name, username, email, password, address, contact, userImage } = this.form;

    this.authService.register(first_name, last_name, username, email, password, address, contact, userImage).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        if((this.isSuccessful = true) || (this.isSignUpFailed = false)) {
          this.router.navigate(['login'])
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  public uploadImage(imageInput: any) {
    const reader = new FileReader(); console.log(reader);

    console.log(imageInput.target.files[0]);
    this.fileUploadService.onUpload(imageInput.target.files[0]).subscribe({
      next: async (response) => {
        console.log(response);
        this.form.userImage = response;       
      },
      error: err => {
        console.log(err);
      }
    })

  }





}
