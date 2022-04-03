export enum Status {
  Deleted = 0,
  Live,
  Hidden,
  Secret,
}

export function toString(type: Status): string {
  switch (type) {
    case Status.Deleted:
      return 'Deleted';
    case Status.Live:
      return 'Active';
    case Status.Hidden:
      return 'Inactive';
    case Status.Secret:
      return 'Incognito';
    default:
      return '';
  }
}
