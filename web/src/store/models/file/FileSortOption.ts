enum FileSortOption {
  TitleAsc = 'titleAsc',
  TitleDesc = 'titleDesc',
  ModifiedDateAsc = 'modifiedDateAsc',
  ModifiedDateDesc = 'modifiedDateDesc',
}

export const members: FileSortOption[] = [
  FileSortOption.TitleAsc,
  FileSortOption.TitleDesc,
  FileSortOption.ModifiedDateAsc,
  FileSortOption.ModifiedDateDesc,
];

export function toString(o: FileSortOption): string {
  switch (o) {
    case FileSortOption.TitleAsc:
      return 'Title A-Z';
    case FileSortOption.TitleDesc:
      return 'Title Z-A';
    case FileSortOption.ModifiedDateAsc:
      return 'Last Modified';
    case FileSortOption.ModifiedDateDesc:
      return 'Last Modified';
    default:
      return '';
  }
}

export function getIconName(o: FileSortOption): string {
  switch (o) {
    // case FileSortOption.TitleAsc:
    case FileSortOption.ModifiedDateAsc:
      return 'arrow-up';
    // case FileSortOption.TitleDesc:
    case FileSortOption.ModifiedDateDesc:
      return 'arrow-down';
    default:
      return '';
  }
}

export function getSortBy(o: FileSortOption): string {
  switch (o) {
    case FileSortOption.TitleAsc:
    case FileSortOption.TitleDesc:
      return 'title';
    case FileSortOption.ModifiedDateAsc:
    case FileSortOption.ModifiedDateDesc:
      return 'modifiedDate';
    default:
      return '';
  }
}

export function getSortOrder(o: FileSortOption): number {
  switch (o) {
    case FileSortOption.TitleAsc:
    case FileSortOption.ModifiedDateAsc:
      return 1;
    case FileSortOption.TitleDesc:
    case FileSortOption.ModifiedDateDesc:
    default:
      return -1;
  }
}

export function getSortOption(sortBy: string, sortOrder: number): FileSortOption {
  if (!sortBy || !sortOrder) {
    return null;
  }
  switch (sortBy.toLowerCase()) {
    case 'title':
      switch (+sortOrder) {
        case 1:
          return FileSortOption.TitleAsc;
        case -1:
          return FileSortOption.TitleDesc;
        default:
          return null;
      }
    case 'modifiedDate':
      switch (+sortOrder) {
        case 1:
          return FileSortOption.ModifiedDateAsc;
        case -1:
          return FileSortOption.ModifiedDateDesc;
        default:
          return null;
      }
    default:
      return null;
  }
}

export { FileSortOption };
