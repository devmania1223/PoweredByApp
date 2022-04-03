import { Language } from '../location/Language';

export interface FileLanguage extends ReturnType<typeof newFileLanguage> {}

export const newFileLanguage = (fetchedFileLanguage: Partial<_FileLanguage>) => {
  const _fileLanguage = new _FileLanguage(fetchedFileLanguage); //for data conversions (_id -> id, etc.)
  const fileLanguage = JSON.parse(JSON.stringify(_fileLanguage)); // serialized-converted fileLanguage
  return fileLanguage;
};

export class _FileLanguage {
  public language: Language = null;
  public title: string = '';
  public content: string = '';
  public description: string = '';
  public fileName: string = '';
  public fileUrl: string = '';
  public fileData: File = null;
  public url: string = '';
  public background: string = '';
  public justify: string = '';

  constructor(params?: Partial<_FileLanguage>) {
    if (!!params) {
      this.language = params.language || this.language;
      this.title = params.title || this.title;
      this.content = params.content || this.content;
      this.description = params.description || this.description;
      this.fileName = params.fileName || this.fileName;
      this.fileUrl = params.fileUrl || this.fileUrl;
      this.fileData = params.fileData || this.fileData;
      this.url = params.url || this.url;
      this.background = params.background || this.background;
      this.justify = params.justify || this.justify;
    }
  }
}
