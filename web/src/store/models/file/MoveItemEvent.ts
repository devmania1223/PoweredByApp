import { Folder } from './Folder';
import { ChildFolder } from './ChildFolder';
import { Content } from './FileContent';
import { ParentFolder } from './ParentFolder';

export interface MoveItemEvent {
  target: ParentFolder | Folder | ChildFolder;
  item: ChildFolder | Content;
}
