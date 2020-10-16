import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesEditorComponent } from './notes-editor/notes-editor.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewSectionComponent } from './view-section/view-section.component';
import { CanDeactivateNoteService } from './services/can-deactivate-note.service';
import { UserFormComponent } from './user-form/user-form.component';


const routes: Routes = [
  { path: 'register', component: UserFormComponent },
  { path: 'viewSection/:id', component: ViewSectionComponent },
  { path: ':id', component: NotesEditorComponent, canDeactivate: [CanDeactivateNoteService] },
  { path: '', component: NotesEditorComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanDeactivateNoteService]
})
export class AppRoutingModule { }
