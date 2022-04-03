import { DocBase, DocBaseModel } from '../collection/DocBase';
import { FileType } from './FileType';
import { FileLanguage, newFileLanguage } from './FileLanguage';
import { Language } from '../location/Language';
import { AssignedTopic } from './AssignedTopic';

//TODO: should we rename this to just "Content" now, or keep it distinguishable from content.languages.content?
export interface Content extends ReturnType<typeof newContent> {}

export const newContent = (fetchedContent: Partial<FileContentModel>) => {
  const _content = new _FileContent(fetchedContent); //for data conversions (_id -> id, etc.)
  const content = JSON.parse(JSON.stringify(_content)); // serialized-converted content
  return content;
};

export interface FileContentModel extends DocBaseModel {
  type: FileType;
  languages: FileLanguage[];
  assignedExhibits: (string | AssignedTopic)[]; // back-compat
  assignedTopics: AssignedTopic[];
  folderId: string;
  organizationId: string;
  isShared: boolean;
  readOnly: boolean;
}

export class _FileContent extends DocBase {
  public type: FileType = null;
  public languages: FileLanguage[] = [];
  public assignedTopics: AssignedTopic[] = [];
  public folderId: string = '';
  public organizationId: string = '';
  public isShared: boolean = false;
  public readOnly: boolean = false;

  constructor(params?: Partial<FileContentModel>) {
    super(params);
    if (!!params) {
      this.type = params.type || this.type;
      this.folderId = params.folderId || this.folderId;
      this.organizationId = params.organizationId || this.organizationId;
      this.isShared = params.isShared || this.isShared;
      this.readOnly = params.readOnly || this.readOnly;
      if (Array.isArray(params.languages)) {
        this.languages = params.languages.map((l) => newFileLanguage(l));
      }
      if (Array.isArray(params.assignedExhibits) && params.assignedExhibits.length > 0) {
        if (typeof params.assignedExhibits[0] === 'string') {
          console.warn('Unsupported assigned exhibits format');
          this.assignedTopics = params.assignedExhibits.map(
            (id) => new AssignedTopic({ _id: id, name: 'TODO' } as any)
          ); //fu q typescript
        } else {
          this.assignedTopics = params.assignedExhibits.map((e) => new AssignedTopic(e as AssignedTopic));
        }
      }
      if (Array.isArray(params.assignedTopics)) {
        this.assignedTopics = params.assignedTopics.map((a) => new AssignedTopic(a));
      }
    }
  }

  public getLanguages(): Language[] {
    const lang: Language[] = [];
    for (const l of this.languages) {
      lang.push(l.language);
    }
    return lang;
  }

  public getDisplayTitle(): string {
    return this.getLanguageField('title');
  }

  public getLanguageField(fieldName: string, requestedLanguage: Language = Language.English): any {
    const language = this.languages.find((n) => n.language === requestedLanguage);
    if (!!language && !!language[fieldName]) {
      return language[fieldName];
    } else if (!!this.languages[0] && !!this.languages[0][fieldName]) {
      return this.languages[0][fieldName];
    } else {
      return 'No Title';
    }
  }
}
