import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Section } from '../interfaces/section';
import { SectionsService } from '../services/sections.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.less']
})
export class SectionsComponent implements OnInit {

  private sectionsField: Section[];
  activeSection: Section | undefined;
  @Output() sectionChanged: EventEmitter<Section> = new EventEmitter<Section>();

  get sections(): Section[] {
    return this.sectionsField;
  }
  set sections(value: Section[]) {
    this.sectionsField = value;
    this.sectionsField.forEach((e, i) => e.order = i);
    this.sectionsService.addSections(this.sectionsField).subscribe();
  }

  @Input()
  set section(section: Section) {
    if (section) {
      this.activeSection = section;
    }
  }


  constructor(private sectionsService: SectionsService) { }

  getSections(): void {
    this.sectionsService.getSections().subscribe(e => {
      this.sectionsField = e.sort(this.sort);
      if (!this.activeSection && this.sections.length > 0) {
        this.showSection(this.sections[0]);
      }
    });
  }

  showSection(section: Section): void {
    //this.activeSection = section; //disabled for CanDeactivateDemo
    this.sectionChanged.emit(section);
  }

  addSection(newSection: HTMLInputElement) {
    const title = newSection.value;
    if (!title) {
      return;
    }

    if (this.sections.map(s => s.title).find(t => t === title)) {
      return;
    }

    const nextOrder = Math.max(...this.sections.map(e => e.order)) + 1;
    const section: Section = { title, id: undefined, order: nextOrder };
    this.sectionsService.addSection(section)
      .subscribe(() => {
        newSection.value = '';
        this.getSections();
      });
  }

  ngOnInit(): void {
    this.getSections();
  }

  private sort(a: Section, b: Section): number {
    if (a.order < b.order) {
      return -1;
    } else if (a.order > b.order) {
      return 1;
    } else {
      return 0;
    }
  }
}
