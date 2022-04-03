import { Topic } from './Topic';
import { Section } from '../section/Section';

export interface ChangeTopicSection {
  topic: Topic;
  previousSectionTopicOrder: string[];
  newSectionTopicOrder: string[];
  previousSection: Section;
  newSection: Section;
}
