import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 
  isSuccessful = false;
  isSignUpFailed = false;

  form: any = {
    username: null,
    password: null,
    first_name: null,
    last_name: null,
    email: null,
    address: null, 
    contact: null,
    userImage: ['']
  };
  isLoginFailed = false;
  errorMessage = '';

  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  showAdmin = false;
  showUser = false;
  currentUser: any;
  first_name?: string;

  searchQuery: string="";
  
  constructor(private router: Router, 
    private tokenStorageService: TokenStorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.tokenStorageService.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.currentUser = this.tokenStorageService.getUser();
    }
    if (this.tokenStorageService.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.showAdmin = this.roles.includes('ROLE_ADMIN');
      this.showUser = this.roles.includes('ROLE_USER');
      this.first_name = user.first_name;
    }
    this.currentUser = this.tokenStorageService.getUser();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  
  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getUser().roles;
        this.username = this.tokenStorageService.getUser().username;
        setTimeout(() => {
          this.router.navigate(['/product']);
       }, 3000);
       setTimeout(() => {
        this.reloadPage();
     }, 3000);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
  onSubmitregister(): void {
    const { first_name, last_name, username, email, password, address, contact, userImage } = this.form;

    this.authService.register(first_name, last_name, username, email, password, address, contact, userImage).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        setTimeout(() => {
          this.router.navigate(['/product']);
       }, 3000);
       setTimeout(() => {
        this.reloadPage();
     }, 3000);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
  searchStore() {
    sessionStorage.setItem("searchQuery", this.searchQuery);
  }

}
