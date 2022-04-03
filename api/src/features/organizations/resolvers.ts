import { OrganizationTC } from './model';
import { canAccessOrganization, authMiddleware } from '../../middleware/auth';

const OrganizationQuery = {
  organizationById: OrganizationTC.getResolver('findById' /*, [canAccessOrganization]*/),
  organizations: OrganizationTC.getResolver('connection' /*, [canAccessOrganization]*/),
};

const OrganizationMutation = {
  organizationUpdateOne: OrganizationTC.getResolver('updateOne' /*, [canAccessOrganization]*/),
};

export { OrganizationQuery, OrganizationMutation };
