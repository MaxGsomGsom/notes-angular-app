import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginUser } from '../interfaces/login-user';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'api/users';
  private loggedInField: LoginUser | undefined;

  get loggedIn(): LoginUser | undefined {
    return this.loggedInField;
  }

  constructor(private http: HttpClient) { }

  getUserByName(name: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${this.baseUrl}?userName=${name}`)
      .pipe(map(e => e.length > 0 ? e[0] : undefined));
  }

  addUser(item: User): Observable<void> {
    return this.http.post<void>(this.baseUrl, item);
  }

  login(login: string, pass: string): Observable<LoginUser> {
    return this.http
      .get<User[]>(`${this.baseUrl}?userName=${login}`)
      .pipe(map(e => {
        this.loggedInField = e.length > 0 && e[0].password === pass ? e[0] : undefined;
        return this.loggedInField;
      }));
  }

  logout(): void {
    this.loggedInField = undefined;
  }

}
