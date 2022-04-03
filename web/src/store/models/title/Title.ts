import { Language } from '../location/Language';

export interface Title extends ReturnType<typeof newTitle> {}

export const newTitle = (fetchedTitle: Partial<TitleConstructorParams>) => {
  const _title = new _Title(fetchedTitle); //for data conversions (_id -> id, etc.)
  const title = JSON.parse(JSON.stringify(_title)); // serialized-converted Title
  return title;
};

interface TitleConstructorParams {
  name: string;
  language: Language;
}

export class _Title {
  public name: string = 'New Section';
  public language: Language = Language.English;

  constructor(data?: Partial<TitleConstructorParams>) {
    if (!!data) {
      this.name = data.name;
      this.language = data.language;
    }
  }
}
