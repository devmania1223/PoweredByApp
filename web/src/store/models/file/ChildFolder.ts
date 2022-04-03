import { DocBase } from '../collection/DocBase';

export class ChildFolder extends DocBase {
  public name: string = '';

  constructor(params?: Partial<ChildFolder>) {
    super(params);
    if (!!params) {
      this.name = params.name || this.name;
    }
  }
}
