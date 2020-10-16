import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginUser } from '../interfaces/login-user';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'api/users';
  private loggedInField: boolean;
  private userLoginSource = new Subject<LoginUser>();

  get loggedIn(): boolean {
    return this.loggedInField;
  }

  userLogin$ = this.userLoginSource.asObservable();


  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  getUserByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}?userName=${name}`);
  }

  addUser(item: User): Observable<void> {
    return this.http.post<void>(this.baseUrl, item);
  }

  login(user: LoginUser): Observable<boolean> {
    return this.http
      .get<User[]>(`${this.baseUrl}?userName=${user.userName}&password=${user.password}`)
      .pipe(map(e => {
        this.loggedInField = e.length > 0;
        if (this.loggedInField) {
          this.userLoginSource.next(user);
        }
        return this.loggedInField;
      }));
  }

  logout(): Observable<void> {
    this.loggedInField = false;
    this.userLoginSource.next();
    return of();
  }

}
