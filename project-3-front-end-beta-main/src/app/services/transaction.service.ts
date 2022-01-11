import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Transaction } from '../models/transaction.model';
import {Instance} from "../models/Instance";
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  baseUrl = Instance.url + "/api/transaction";
  header = {};

  constructor(private http: HttpClient, tokenService: TokenStorageService) {
    this.header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${tokenService.getToken()}`)
    }
   }

  sendTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl + "/post", transaction, this.header);
  }


}
