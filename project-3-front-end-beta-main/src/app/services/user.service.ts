import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Instance} from "../models/Instance";

@Injectable({
  providedIn: 'root'
})
export class UserService {

 // baseUrl = Instance.url + "/api";
  baseUrl = "http://localhost:7777/api";
  constructor(private http: HttpClient) { }

  updateUserService(updateUser: User):Observable <User>{
    return this.http.put<User>(this.baseUrl+"/users/"+updateUser.user_id,updateUser);
   }
  
  // Get a user
  getAUserService(user_id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + "/users/" + user_id);
  }
   
}
