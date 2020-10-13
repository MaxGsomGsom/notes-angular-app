import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Section } from '../interfaces/section';
import { SectionsService } from '../services/sections.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.less']
})
export class SectionsComponent implements OnInit {

  sections: Section[] = [];
  activeSection: Section | undefined;
  @Output() sectionChanged: EventEmitter<Section> = new EventEmitter<Section>();


  constructor(private sectionsService: SectionsService) { }

  getSections(): void {
    this.sectionsService.getSections().subscribe(e => {
      this.sections = e;
      if (this.sections.length > 0) {
        this.showSection(this.sections[0]);
      }
    });
  }

  showSection(section: Section): void {
    this.activeSection = section;
    this.sectionChanged.emit(this.activeSection);
  }

  addSection(newSection: HTMLInputElement) {
    const title = newSection.value;
    if (!title) {
      return;
    }

    if (this.sections.map(s => s.title).find(t => t === title)) {
      return;
    }

    const section: Section = { title, id: undefined };
    this.sections.unshift(section);
    this.showSection(section);

    this.sectionsService.addSection(section)
      .subscribe(() => {
        newSection.value = '';
        this.getSections();
      });
  }

  ngOnInit(): void {
    this.getSections();
  }
}
