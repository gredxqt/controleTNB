import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Setting } from '../entitiy/Setting';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  url: string = 'http://localhost:8080/api/v1/setting';
  constructor(private http: HttpClient) {}

  public allSettings(): Observable<Setting[]> {
    return this.http.get<Setting[]>(this.url);
  }

  public addSetting(obj: Setting): Observable<Setting> {
    return this.http.post<Setting>(this.url + '/', obj);
  }

  public deleteSetting(obj: Setting): Observable<Setting> {
    return this.http.delete<Setting>(this.url + '/' + obj.id);
  }

  public updateSetting(obj: Setting): Observable<Setting> {
    return this.http.put<Setting>(this.url + '/', obj);
  }

  public getSettingById(id: number): Observable<Setting> {
    return this.http.get<Setting>(this.url + '/' + id);
  }
}
