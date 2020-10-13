import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../interfaces/note';
import { Section } from '../interfaces/section';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.less']
})
export class NotesComponent implements OnInit {

  private sectionField: Section;
  text: string;
  notes: Note[] = [];

  @Input()
  set section(value: Section) {
    this.sectionField = value;
    this.getNotes();
  }

  get section(): Section {
    return this.sectionField;
  }

  constructor(private notesService: NotesService) { }

  add(): void {
    const note: Note = {
      text: this.text,
      id: undefined,
      sectionId: this.section.id
    };
    this.notesService.addNote(note).subscribe(() => {
      this.text = '';
      this.getNotes();
    });
  }

  remove(id: number): void {
    this.notesService.removeNote(id).subscribe(() => {
      this.getNotes();
    });
  }

  getNotes(): void {
    this.notesService.getNotes(this.section.id).subscribe(e => {
      this.notes = e;
      this.notes.sort(this.sort);
    });
  }

  moveOnTop(id: number): void {
    const note = this.notes.find(e => e.id === id);
    this.notesService.removeNote(id).subscribe(() => {
      this.notesService.addNote({ ...note, id: undefined }).subscribe(() => {
        this.getNotes();
      });
    });
  }

  ngOnInit(): void {
    this.getNotes();
  }

  private sort(a: Note, b: Note): number {
    if (a.id < b.id) {
      return 1;
    } else if (a.id > b.id) {
      return -1;
    } else {
      return 0;
    }
  }
}
