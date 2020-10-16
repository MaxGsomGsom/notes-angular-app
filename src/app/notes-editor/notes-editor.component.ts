import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from '../interfaces/section';
import { SectionsService } from '../services/sections.service';
import { map } from 'rxjs/operators';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'app-notes-editor',
  templateUrl: './notes-editor.component.html',
  styleUrls: ['./notes-editor.component.less']
})
export class NotesEditorComponent implements OnInit {
  section: Section | undefined;
  @ViewChild(NotesComponent) notesComponent: NotesComponent;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sectionService: SectionsService) { }

  ngOnInit(): void {
    this.route.params
      .pipe(map(params => params.id))
      .subscribe(id => {
        if (id) {
          this.sectionService.getSection(id)
            .subscribe(e => this.section = e);
        }
      });

  }

  setSection(section: Section) {
    //this.section = section; //disabled for CanDeactivateDemo
    this.router.navigate([section.id]);
  }

}
