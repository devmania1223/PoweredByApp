import { gql } from '@apollo/client';

// address: {
//   country
//   administrativeArea     # state
//   subAdministrativeArea  # county
//   locality               # city
//   postalCode             # zip
//   thoroughfare           # street address
//   premise                # apartment/suite (address2)
// }

const organizationFragment = gql`
  fragment Organization_organization on Organization {
    _id
    name
    address {
      country
      administrativeArea
      subAdministrativeArea
      locality
      postalCode
      thoroughfare
      premise
    }
    email
    phone
    liiingoOrganizationId
    active
    stripeCustomerId
    permissions {
      organizationProfile
      hasLiiingoAccess
      brandedLiiingoApp
    }
    updatedAt
    createdAt
    __typename
  }
`;

const locationFragment = gql`
  fragment Location_location on Location {
    _id
    updatedAt
    name
    companyName
    contactName
    customQrLogoImageUrl
    customQrCodeColors {
      primary
      secondary
    }
    headerImageUrl
    headerLogoImageUrl
    topicBackgroundImageUrl
    email
    phone
    qrCode
    zipPath
    liiingoUrl
    exhibit {
      liiingoExhibitId
      _id: liiingoExhibitId
      templateId
      __typename
    }
    __typename
  }
`;

export const location_exhibit_templatedContent_languages = gql`
  fragment Location_exhibit_templatedContent_languages on LocationExhibitTemplatedContent {
    languages {
      en {
        name
        value
        fileUrl
      }
      es {
        name
        value
        fileUrl
      }
      zh_Hans {
        name
        value
        fileUrl
      }
      de {
        name
        value
        fileUrl
      }
      pt {
        name
        value
        fileUrl
      }
      fr {
        name
        value
        fileUrl
      }
      it {
        name
        value
        fileUrl
      }
      ru {
        name
        value
        fileUrl
      }
      ja {
        name
        value
        fileUrl
      }
      ko {
        name
        value
        fileUrl
      }
      no {
        name
        value
        fileUrl
      }
      el {
        name
        value
        fileUrl
      }
      tr {
        name
        value
        fileUrl
      }
    }
  }
`;

export const templatedContentFragment = gql`
  fragment Location_location_exhibit_templatedContent on LocationExhibitTemplatedContent {
    _id
    liiingoContentId
    liiingoContentType
    ...Location_exhibit_templatedContent_languages
    __typename
  }
  ${location_exhibit_templatedContent_languages}
`;

const exhibitWithTemplatedContentFragment = gql`
  fragment Location_location_exhibit on LocationExhibit {
    liiingoExhibitId
    _id: liiingoExhibitId
    templateId
    templatedContent {
      ...Location_location_exhibit_templatedContent
    }
    __typename
  }
  ${templatedContentFragment}
`;
// name
// value
// fileUrl

// const organizationButtonLinksFragment = gql`
//   fragment Organization_buttonLinks on Organization {
//     buttonLinks {
//       contactUsUrl
//       getStartedUrl
//       joinUsUrl
//       learnMoreUrl
//       ourMissionUrl
//       scheduleYourVaccinationUrl
//       shopNowUrl
//       subscribeUrl
//       visitOurWebsiteUrl
//     }
//   }
// `;

// const userBasicInfoFragment = gql`
//   fragment User_basicInfo on User {
//     _id
//     firstName
//     lastName
//     email
//     phone
//     active
//     __typename
//   }
// `;

export const UPDATE_USER_MUTATION = gql`
  mutation userUpdateOne(
    $record: UpdateOneUserInput!
    $filter: FilterUpdateOneUserInput!
    $sort: SortUpdateOneUserInput
    $skip: Int
  ) {
    userUpdateOne(record: $record, filter: $filter, sort: $sort, skip: $skip) {
      record {
        _id
        organization {
          _id
        }
      }
    }
  }
`;

export const UPDATE_ORGANIZATION_INFO_MUTATION = gql`
  mutation updateOrganizationInfo(
    $id: MongoID!
    $organizationName: String
    $address: UpdateOneOrganizationAddressInput
    $phone: String
  ) {
    organizationUpdateOne(record: { name: $organizationName, address: $address, phone: $phone }, filter: { _id: $id }) {
      record {
        ...Organization_organization
      }
    }
  }
  ${organizationFragment}
`;

export const UPDATE_EXHIBIT_CONTENT = gql`
  mutation updateExhibitContent($locationId: MongoID!, $content: [UpdateOneLocationExhibitTemplatedContentInput]) {
    locationUpdateOne(filter: { _id: $locationId }, record: { exhibit: { templatedContent: $content } }) {
      record {
        _id
        exhibit {
          ...Location_location_exhibit
        }
      }
    }
  }
  ${exhibitWithTemplatedContentFragment}
`;

export const UPDATE_LOCATION_QR_CODE = gql`
  mutation updateLocationQrCode(
    $id: MongoID!
    $customQrLogoImageFile: Upload
    $customQrCodeColorPrimary: String
    $customQrCodeColorSecondary: String
  ) {
    locationUpdateOne(
      filter: { _id: $id }
      record: {
        customQrLogoImage: $customQrLogoImageFile
        customQrCodeColors: { primary: $customQrCodeColorPrimary, secondary: $customQrCodeColorSecondary }
      }
    ) {
      record {
        ...Location_location
      }
    }
  }
  ${locationFragment}
`;

export const UPDATE_LOCATION_MEDIA = gql`
  mutation updateLocationMedia(
    $id: MongoID!
    $headerImageFile: Upload
    $headerLogoImageFile: Upload
    $topicBackgroundImageFile: Upload
  ) {
    locationUpdateOne(
      filter: { _id: $id }
      record: {
        headerImage: $headerImageFile
        headerLogoImage: $headerLogoImageFile
        topicBackgroundImage: $topicBackgroundImageFile
      }
    ) {
      record {
        ...Location_location
      }
    }
  }
  ${locationFragment}
`;

// export const UPDATE_ORGANIZATION_APP_LINKS_MUTATION = gql`
//   mutation updateOrganizationAppLinks(
//     $id: MongoID!
//     $contactUsUrl: String
//     $getStartedUrl: String
//     $joinUsUrl: String
//     $learnMoreUrl: String
//     $ourMissionUrl: String
//     $scheduleYourVaccinationUrl: String
//     $shopNowUrl: String
//     $subscribeUrl: String
//     $visitOurWebsiteUrl: String
//   ) {
//     organizationUpdateOne(
//       record: {
//         buttonLinks: {
//           contactUsUrl: $contactUsUrl
//           getStartedUrl: $getStartedUrl
//           joinUsUrl: $joinUsUrl
//           learnMoreUrl: $learnMoreUrl
//           ourMissionUrl: $ourMissionUrl
//           scheduleYourVaccinationUrl: $scheduleYourVaccinationUrl
//           shopNowUrl: $shopNowUrl
//           subscribeUrl: $subscribeUrl
//           visitOurWebsiteUrl: $visitOurWebsiteUrl
//         }
//       }
//       filter: { _id: $id }
//     ) {
//       record {
//         ...Organization_organization
//         ...Organization_buttonLinks
//       }
//     }
//   }
//   ${organizationFragment}
//   ${organizationButtonLinksFragment}
// `;

export const GET_PLAN_FOR_USER_QUERY = gql`
  query getPlanForUser($sub: String!) {
    user(filter: { sub: $sub }) {
      planId
      billing
    }
  }
`;

export const GET_PLAN_BY_ID_QUERY = gql`
  query getPlanById($id: MongoID!) {
    planById(_id: $id) {
      _id
      name
      annualStripeId
      monthlyStripeId
      restrictions
      updatedAt
      createdAt
    }
  }
`;

export const GET_PLAN_BY_NAME_QUERY = gql`
  query getPlanByName($name: String!) {
    planByName(name: $name) {
      _id
      name
      annualStripeId
      monthlyStripeId
      restrictions
      createdAt
      updatedAt
    }
  }
`;

export const GET_ORGANIZATION_BY_ID_QUERY = gql`
  query getOrganizationById($id: MongoID!) {
    organizationById(_id: $id) {
      ...Organization_organization
    }
  }
  ${organizationFragment}
`;

export const GET_LOCATION_FOR_USER = gql`
  query getLocationForUser($sub: String!) {
    user(filter: { sub: $sub }) {
      location {
        ...Location_location
        exhibit {
          ...Location_location_exhibit
        }
      }
    }
  }
  ${locationFragment}
  ${exhibitWithTemplatedContentFragment}
`;

export const UPDATE_LOCATION = gql`
  mutation updateLocation($id: MongoID!, $name: String!, $contactName: String!, $companyName: String!) {
    locationUpdateOne(
      record: { name: $name, contactName: $contactName, companyName: $companyName }
      filter: { _id: $id }
    ) {
      recordId
      record {
        ...Location_location
      }
    }
  }
  ${locationFragment}
`;

export const GET_APP_ONBOARDING_FLOW_BY_ROUTE = gql`
  query getAppOnboardingFlowByRoute($route: String!) {
    appOnboardingFlowByRoute(route: $route) {
      _id
      organization {
        _id
        name
        stripeCustomerId
      }
      essentialTemplate {
        name
        stripeProductCode
        templateId
      }
      createNewOrganization
      route
      logo
      favicon
      __typename
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation register($organizationId: String!, $onboardingRoute: String!, $referrer: String, $termsOfService: Boolean!) {
    register(
      organizationId: $organizationId
      onboardingRoute: $onboardingRoute
      referrer: $referrer
      termsOfService: $termsOfService
    ) {
      sessionId
    }
  }
`;

export const REGISTER_NEW_ORG_MUTATION = gql`
  mutation registerNewOrg(
    $onboardingRoute: String!
    $referrer: String
    $termsOfService: Boolean!
    $planId: String
    $billing: String
  ) {
    registerNewOrg(
      onboardingRoute: $onboardingRoute
      referrer: $referrer
      termsOfService: $termsOfService
      planId: $planId
      billing: $billing
    ) {
      sessionId
    }
  }
`;

export const CREATE_BILLING_SESSION_MUTATION = gql`
  mutation createBillingSession($_id: String!) {
    createBillingSession(_id: $_id) {
      url
    }
  }
`;

export const CLOSE_ACCOUNT_MUTATION = gql`
  mutation closeAccount($route: String!) {
    closeAccount(route: $route) {
      recordId
    }
  }
`;

export const INVITE_USER_MUTATION = gql`
  mutation inviteUser($email: String!) {
    inviteUser(email: $email)
  }
`;

export const FIND_USERS_FOR_ORGANIZATION = gql`
  query getUser($filter: FilterFindOneUserInput) {
    user(filter: $filter) {
      organization {
        users {
          sub
          email
        }
      }
    }
  }
`;

export const VERIFY_PAYMENT_MUTATION = gql`
  mutation verifyPayment($checkoutSessionId: String!, $isUpgrade: Boolean!) {
    verifyPayment(checkoutSessionId: $checkoutSessionId, isUpgrade: $isUpgrade) {
      verified
    }
  }
`;

export const CREATE_CHECKOUT_SESSION_MUTATION = gql`
  mutation createCheckoutSession($productCode: String, $route: String!, $successUrl: String!, $cancelUrl: String!) {
    createCheckoutSession(productCode: $productCode, route: $route, successUrl: $successUrl, cancelUrl: $cancelUrl) {
      sessionId
    }
  }
`;

export const GET_NOTIFICATIONS_QUERY = gql`
  query getScheduledNotifications($id: String!) {
    getNotifications(topicId: $id) {
      notifications {
        _id
        scheduleTime
        message
      }
    }
  }
`;

export const SEND_NOTIFICATION_MUTATION = gql`
  mutation sendNotification($message: String!, $scheduledTime: String, $topicId: String!) {
    sendNotification(message: $message, scheduledTime: $scheduledTime, topicId: $topicId) {
      success
    }
  }
`;

export const DELETE_NOTIFICATION_MUTATION = gql`
  mutation deleteNotification($id: String!) {
    deleteNotification(id: $id) {
      success
    }
  }
`;

export const SUBSCRIPTION_QUERY = gql`
  query getSubscription {
    subscription {
      id
      trialEnd
      trialStart
      status
      startDate
      daysUntilDue
    }
    customerPaymentMethod {
      object
    }
  }
`;

export const GET_LOCATION_BY_ID = gql`
  query getLocation($id: MongoID!) {
    getLocationById(_id: $id) {
      ...Location_location
      exhibit {
        ...Location_location_exhibit
      }
    }
  }
  ${exhibitWithTemplatedContentFragment}
  ${locationFragment}
`;
