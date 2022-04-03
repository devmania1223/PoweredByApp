import { IOrganization, OrganizationAddress } from '../features/organizations/model';

export const welcomeMessageTemplate = (welcomeMessage: IOrganization['welcomeMessage']): string => {
  return `<p>${welcomeMessage}</p>`;
};

export const contactInfoTemplate = (
  organizationName: IOrganization['name'],
  address: OrganizationAddress,
  hoursOfService: IOrganization['hoursOfService']
): string => {
  return `<p style=\"text-align: center;\">${organizationName} is located at:</p> <p style=\"text-align: center;\">${address.thoroughfare}<br />${address.locality}, ${address.administrativeArea} ${address.postalCode} </p>\n
  <p style=\"text-align: center;\">\n<p style=\"text-align: center;\">Hours of Operation:</p>
  <p style=\"text-align: center;\">${hoursOfService}</p>
  <p style=\"text-align: center;\">&nbsp;</p>
    `;
};
