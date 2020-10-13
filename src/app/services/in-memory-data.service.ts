import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Db } from '../interfaces/db';

const initDb: Db = {
  notes: [
    { id: 1, text: 'Test note', sectionId: 1 }
  ],
  sections: [
    { id: 1, title: 'Test section' }
  ]
};

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  private db: Db;

  constructor() {
    setInterval(() => localStorage.setItem('db', JSON.stringify(this.db)), 1000);
  }

  createDb() {
    const saved = localStorage.getItem('db');
    if (saved) {
      this.db = JSON.parse(saved) as Db;
      return this.db;
    }

    this.db = initDb;
    return this.db;
  }
}
