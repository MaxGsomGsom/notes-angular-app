import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from '../interfaces/section';
import { SectionsService } from '../services/sections.service';
import { map } from 'rxjs/operators';
import { NotesComponent } from '../notes/notes.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-notes-editor',
  templateUrl: './notes-editor.component.html',
  styleUrls: ['./notes-editor.component.less']
})
export class NotesEditorComponent implements OnInit {
  section: Section | undefined;
  @ViewChild(NotesComponent) notesComponent: NotesComponent;

  get loggedIn(): boolean {
    return !!this.usersService.loggedIn;
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sectionService: SectionsService,
              private usersService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.getSection(params.id));
  }

  getSection(id: number) {
    if (id && this.usersService.loggedIn) {
      this.sectionService.getSection(id, this.usersService.loggedIn.id)
        .subscribe(e => this.section = e);
    }
  }

  setSection(section: Section) {
    //this.section = section; //disabled for CanDeactivateDemo
    this.router.navigate([section.id]);
  }

}
