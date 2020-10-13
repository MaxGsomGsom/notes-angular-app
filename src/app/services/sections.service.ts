import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Section } from '../interfaces/section';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {
  private readonly baseUrl = 'api/sections';

  constructor(private http: HttpClient) { }

  getSections(): Observable<Section[]> {
    return this.http.get<Section[]>(this.baseUrl);
  }

  addSection(item: Section): Observable<void> {
    return this.http.post<void>(this.baseUrl, item);
  }

  removeSection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
