import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
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

  getSection(id: number): Observable<Section> {
    return this.http.get<Section>(`${this.baseUrl}/${id}`);
  }

  addSection(item: Section): Observable<void> {
    return this.http.post<void>(this.baseUrl, item);
  }

  addSections(items: Section[]): Observable<void> {
    return merge(...items.map(item => this.http.post<void>(this.baseUrl, item)));
  }
}
