import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import '@angular/compiler';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api/http-client-in-memory-web-api.module';
import { InMemoryDataService } from './services/in-memory-data.service';
import { FormsModule } from '@angular/forms';
import { SectionsComponent } from './sections/sections.component';
import { DragulaModule } from 'ng2-dragula';
import { SectionFilterPipe } from './services/section-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    SectionsComponent,
    SectionFilterPipe
  ],
  imports: [
    BrowserModule,
    DragulaModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
