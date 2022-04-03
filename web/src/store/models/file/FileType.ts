export enum FileType {
  text = 'text',
  video = 'video',
  image = 'image',
  Image360 = 'image360',
  webview = 'webview',
}

export const asArray: FileType[] = [FileType.image, FileType.Image360, FileType.text, FileType.video, FileType.webview];

export function toString(type: FileType): string {
  switch (type) {
    case FileType.image:
      return 'Image';
    case FileType.Image360:
      return '360 Image';
    case FileType.text:
      return 'Text';
    case FileType.video:
      return 'Video';
    case FileType.webview:
      return 'Button';
    default:
      return '';
  }
}

export function iconName(type: FileType): string {
  switch (type) {
    case FileType.image:
      return 'image';
    case FileType.Image360:
      return 'street-view';
    case FileType.text:
      return 'file-alt';
    case FileType.video:
      return 'video';
    case FileType.webview:
      return 'link';
    default:
      return '';
  }
}
