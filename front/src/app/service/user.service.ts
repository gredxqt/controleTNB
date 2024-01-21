import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entitiy/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:8081/api/v1/user';
  constructor(private http: HttpClient) {}

  public allUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  public addUser(obj: User): Observable<User> {
    return this.http.post<User>(this.url + '/', obj);
  }

  public deleteUser(obj: User): Observable<User> {
    return this.http.delete<User>(this.url + '/' + obj.id);
  }

  public updateUser(obj: User): Observable<User> {
    return this.http.put<User>(this.url + '/', obj);
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/' + id);
  }
}
