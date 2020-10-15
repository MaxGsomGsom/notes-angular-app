import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NotesEditorComponent } from '../notes-editor/notes-editor.component';

@Injectable()
export class CanDeactivateNoteService implements CanDeactivate<NotesEditorComponent> {

  canDeactivate(
    notesEditorComponent: NotesEditorComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const note = notesEditorComponent.notesComponent.noteText.nativeElement.value;
    if (note && note.length > 0) {
      return window.confirm(
        `You have entered the note.\nDo you really want to change section?`);
    } else {
      return true;
    }
  }
}

