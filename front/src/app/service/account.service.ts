import { Injectable } from '@angular/core';
import { Account } from '../entitiy/Account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  url: string = 'http://localhost:8082/api/v1/account';
  constructor(private http: HttpClient) {}

  public allAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.url);
  }

  public addAccount(acc: Account): Observable<Account> {
    return this.http.post<Account>(this.url + '/', acc);
  }

  public deleteAccount(id: number): Observable<Account> {
    return this.http.delete<Account>(this.url + '/' + id);
  }

  public updateAccount(acc: Account): Observable<Account> {
    return this.http.put<Account>(this.url + '/' + acc.id, acc);
  }

  public getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(this.url + '/' + id);
  }
}
