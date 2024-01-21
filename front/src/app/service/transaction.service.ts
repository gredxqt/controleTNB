import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../entitiy/Transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  url: string = 'http://localhost:8082/api/v1/transaction';
  constructor(private http: HttpClient) {}

  public allTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url);
  }

  public addTransaction(obj: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.url + '/', obj);
  }

  public deleteTransaction(obj: Transaction): Observable<Transaction> {
    return this.http.delete<Transaction>(this.url + '/' + obj.id);
  }

  public updateTransaction(obj: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(this.url + '/' + obj.id, obj);
  }

  public getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(this.url + '/' + id);
  }
  
}
