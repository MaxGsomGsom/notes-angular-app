import { Note } from './note';

export interface Db {
    readonly notes: Note[];
}