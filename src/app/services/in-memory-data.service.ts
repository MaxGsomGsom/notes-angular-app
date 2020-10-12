import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Db } from '../interfaces/db';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const db: Db = {
      notes: [
        { id: 1, text: 'Test note' }
      ]
    }
    return db;
  }
}
