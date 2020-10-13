import { Pipe, PipeTransform } from '@angular/core';
import { Section } from '../interfaces/section';

@Pipe({
  name: 'sectionFilter',
  pure: false
})
export class SectionFilterPipe implements PipeTransform {

  transform(sections: Section[], v: string): Section[] {
    if (!sections) {
      return [];
    }
    return sections.filter(
      s => s.title.toLowerCase().startsWith(v.toLowerCase()));
  }

}
