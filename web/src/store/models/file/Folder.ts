import { BSONConverter } from 'mongodb-bson-types';
import { DocBase } from '../collection/DocBase';
import { ChildFolder } from './ChildFolder';
import { ParentFolder } from './ParentFolder';
import { Content, newContent } from './FileContent';

export class Folder extends DocBase {
  public children: ChildFolder[] = [];
  public content: Content[] = [];
  public isRoot: boolean = false;
  public name: string = '';
  public organizationId: string = '';
  public parentFolderId: string = '';
  public parents: ParentFolder[] = [];
  public privacySettings?: any = null;

  constructor(params?: Partial<Folder>) {
    super(params);
    if (!!params) {
      this.isRoot = params.isRoot || this.isRoot;
      this.name = params.name || this.name;
      if (!!params.parentFolderId) {
        this.parentFolderId = BSONConverter.objectId(params.parentFolderId);
      }
      if (!!params.organizationId) {
        this.organizationId = BSONConverter.objectId(params.organizationId);
      }
      this.parentFolderId = params.parentFolderId || this.parentFolderId;
      this.privacySettings = params.privacySettings || this.privacySettings;
      if (Array.isArray(params.content)) {
        this.content = params.content.map((c) => newContent(c));
      }
      if (Array.isArray(params.children)) {
        this.children = params.children.map((c) => new ChildFolder(c));
      }
      if (Array.isArray(params.parents)) {
        this.parents = params.parents.map((p) => new ParentFolder(p));
      }
      console.log('folder', this);
    }
  }
}
