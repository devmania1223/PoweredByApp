const sendGrid = require('@sendgrid/mail');
import { config } from '../config';
import { OrganizationModel } from '../features/organizations/model';
import { UserModel } from '../features/users/model';
import { logger } from '../util/logger';
sendGrid.setApiKey(config.SENDGRID_API_KEY);
const isSandboxEmailModeEnabled = config?.SENDGRID_SANDBOX_EMAILS?.toString().toLowerCase() == 'true';

export const sendResetPasswordEmail = async (email: string, accessToken: string) => {
  const passwordResetEmailTemplateId = 'd-3b725e3e79814a35b9c541aeb09381b0';
  const message = {
    to: email,
    from: {
      email: 'no-reply@pavethewaytogether.com',
      name: 'PAVE The Way',
    },
    templateId: passwordResetEmailTemplateId,
    mail_settings: {
      sandbox_mode: {
        enable: isSandboxEmailModeEnabled,
      },
    },
    dynamicTemplateData: {
      resetPasswordUrl: `${config.CLIENT_URL}/reset-password/?email=${email}&token=${accessToken}`,
    },
  };
  try {
    await sendGrid.send(message);
    logger.info(`Password reset email sent to ${email} (sandbox mode: ${isSandboxEmailModeEnabled})`);
  } catch (error) {
    logger.error(
      `Unable to send password reset email to ${email} (sandbox mode: ${isSandboxEmailModeEnabled}): ${error}`
    );
    throw error;
  }
};

export const sendUserInviteEmail = async (
  email: string,
  accessToken: string,
  adminUser: UserModel,
  organization: OrganizationModel
) => {
  const invitationEmailTemplateId = 'd-63a898729a974647a2dbca728498c394';
  const message = {
    to: email,
    from: {
      email: 'no-reply@pavethewaytogether.com',
      name: 'PAVE The Way',
    },
    templateId: invitationEmailTemplateId,
    mail_settings: {
      sandbox_mode: {
        enable: isSandboxEmailModeEnabled,
      },
    },
    dynamicTemplateData: {
      acceptInvitationUrl: `${config.CLIENT_URL}/accept-invitation/?email=${email}&token=${accessToken}`,
      adminName: `${adminUser.firstName} ${adminUser.lastName}`,
      organizationName: organization.name,
    },
  };
  try {
    await sendGrid.send(message);
    logger.info(
      `User invitation email sent to ${email} by admin: ${adminUser.email} (sandbox mode: ${isSandboxEmailModeEnabled})`
    );
  } catch (error) {
    logger.error(`Unable to send user invite email to ${email} (sandbox mode: ${isSandboxEmailModeEnabled}): ${error}`);
    throw error;
  }
};

export const sendWelcomeEmail = async (user: UserModel, qrCodeUrl: string, route: string) => {
  const welcomeEmailTemplateId = 'd-9cfee043486e40c0a5545891871c2303'; // Access templates here: https://mc.sendgrid.com/dynamic-templates
  const message = {
    to: user.email,
    from: {
      email: 'no-reply@liiingo.com',
      name: 'Liiingo',
    },
    templateId: welcomeEmailTemplateId,
    mail_settings: {
      sandbox_mode: {
        enable: isSandboxEmailModeEnabled,
      },
    },
    dynamicTemplateData: {
      loginUrl: `${config.CLIENT_URL}/${route}`,
      qrCodeUrl: qrCodeUrl,
      firstName: user.firstName, //not working, firstName doesn't exist on user here
    },
  };

  try {
    await sendGrid.send(message);
    logger.info(`welcome email sent to ${user.email} (sandbox mode: ${isSandboxEmailModeEnabled})`);
  } catch (error) {
    logger.error(
      `Unable to send welcome email to ${user.email} (sandbox mode: ${isSandboxEmailModeEnabled}): ${error}`
    );
  }
};

export const sendTrialAboutToExpireEmail = async (email: string, stripeCheckOutUrl: string) => {
  const trialAboutToExpireEmailTemplateId = 'd-96d219fe0f2644cba005610ae88c86ef'; // Access templates here: https://mc.sendgrid.com/dynamic-templates
  const message = {
    to: email,
    from: {
      email: 'no-reply@liiingo.com',
      name: 'Liiingo',
    },
    templateId: trialAboutToExpireEmailTemplateId,
    mail_settings: {
      sandbox_mode: {
        enable: isSandboxEmailModeEnabled,
      },
    },
    dynamicTemplateData: {
      stripeCheckOutUrl: stripeCheckOutUrl,
    },
  };

  try {
    await sendGrid.send(message);
    logger.info(`trial-expiring email sent to ${email} (sandbox mode: ${isSandboxEmailModeEnabled})`);
  } catch (error) {
    logger.error(
      `Unable to send trial-expiring email to ${email} (sandbox mode: ${isSandboxEmailModeEnabled}): ${error}`
    );
  }
};
