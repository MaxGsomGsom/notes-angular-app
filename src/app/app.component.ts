import { Component } from '@angular/core';
import { Section } from './interfaces/section';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'notes-app';
  
  section: Section | undefined;

  setSection(section: Section) {
    this.section = section;
}

}
