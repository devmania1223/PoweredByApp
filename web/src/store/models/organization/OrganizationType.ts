export enum OrganizationType {
  Subscriber = 'subscriber',
  Partner = 'partner',
  Child = 'child',
}

export const members: OrganizationType[] = [
  OrganizationType.Partner,
  OrganizationType.Subscriber,
  OrganizationType.Child,
];

export function toString(type: OrganizationType): string {
  switch (type) {
    case OrganizationType.Partner:
      return 'Partner';
    case OrganizationType.Subscriber:
      return 'Subscriber';
    case OrganizationType.Child:
      return 'Extended Organization';
    default:
      return '';
  }
}
