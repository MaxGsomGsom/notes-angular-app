import { Component, OnInit } from '@angular/core';
import { Note } from '../interfaces/note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.less']
})
export class NotesComponent implements OnInit {

  text: string;
  notes: Note[] = [];

  constructor(private notesService: NotesService) { }

  add(): void {
    const note = { text: this.text, id: undefined };
    this.notesService.addNote(note).subscribe();
    this.text = '';
    this.notes.push(note);
  }

  remove(id): void {
    this.notesService.removeNote(id).subscribe();
    this.notes.splice(this.notes.findIndex(e => e.id), 1);
  }

  getNotes(): void {
    this.notesService.getNotes().subscribe(e => this.notes = e);
  }


  ngOnInit(): void {
    this.getNotes();
  }

}
