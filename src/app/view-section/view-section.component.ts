import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../interfaces/note';
import { Section } from '../interfaces/section';
import { NotesService } from '../services/notes.service';
import { SectionsService } from '../services/sections.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.less']
})
export class ViewSectionComponent implements OnInit {
  section: Section;
  notes: Note[];

  constructor(private route: ActivatedRoute,
              private sectionService: SectionsService,
              private noteService: NotesService,
              private userService: UserService) { }

  ngOnInit(): void {
    if (this.route.snapshot.params.id && this.userService.loggedIn) {
      this.sectionService.getSection(this.route.snapshot.params.id, this.userService.loggedIn.id)
        .subscribe(e => this.section = e);
      this.noteService.getNotes(this.route.snapshot.params.id)
        .subscribe(e => this.notes = e);
    }
  }

}
