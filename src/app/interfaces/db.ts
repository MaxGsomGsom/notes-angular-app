import { Note } from './note';
import { Section } from './section';
import { User } from './user';

export interface Db {
    readonly notes: Note[];
    readonly sections: Section[];
    readonly users: User[];
}