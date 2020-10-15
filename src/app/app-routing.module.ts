import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesEditorComponent } from './notes-editor/notes-editor.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewSectionComponent } from './view-section/view-section.component';


const routes: Routes = [
  { path: 'viewSection/:id', component: ViewSectionComponent },
  { path: ':id', component: NotesEditorComponent },
  { path: '', component: NotesEditorComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
