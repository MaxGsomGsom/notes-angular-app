import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'api/users';

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

  addUsers(items: User[]): Observable<void> {
    return merge(...items.map(item => this.http.post<void>(this.baseUrl, item)));
  }
}
