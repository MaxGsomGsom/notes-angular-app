import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Db } from '../interfaces/db';

const initDb: Db = {
  notes: [
    { id: 1, text: 'Test note', sectionId: 1 }
  ],
  sections: [
    { id: 1, title: 'Test section', order: 1, userId: 1 }
  ],
  users: [
    { id: 1, dateOfBirth: '01/01/2020', email: 'test@test.ru', password: '1234', password2: '1234', subscribe: true, userName: 'TestUser' }
  ]
};

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  private db: Db;

  constructor() {
    setInterval(() => {
      if (this.db) {
        localStorage.setItem('db', JSON.stringify(this.db));
      }
    }, 1000);
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
