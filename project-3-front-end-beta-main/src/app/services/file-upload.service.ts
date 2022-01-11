import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {Instance} from "../models/Instance";
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  public files: any[] = [];
  baseUrl = Instance.url + "/file";
  header = {};


  constructor(private http: HttpClient, tokenService: TokenStorageService) {
    this.header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${tokenService.getToken()}`)
    }
    this.files = [];
  }

  onFileChanged(event: any) {
    this.files = event.target.files;
  }

  onUpload(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', image);

    console.log("file-upload Service"+image);

    // let httpOptions = {
    //   headers: new HttpHeaders({
    //     'Accept': 'text/html, application/xhtml+xml, */*',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }),
    //   responseType: 'text'
    // };

    return this.http.post<any>(this.baseUrl + '/upload', formData, this.header);
  }
  // const formData = new FormData();
  // for (const file of this.files) {
  // formData.append(name, file, file.name);


}


// return this.http.post<string>(this.baseUrl + '/upload', formData, {
//   headers: new HttpHeaders({
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   })
// });

// {
//   headers: new HttpHeaders({
//     'Accept': 'text/html, application/xhtml+xml, */*',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }),
//   responseType: 'text'
// }
