import { Note } from './note';
import { Section } from './section';

export interface Db {
    readonly notes: Note[];
    readonly sections: Section[];
}