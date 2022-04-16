export const standardSubscriptionPollDelay = 600000;
export const sessionValidityPollDelay = 60000;
export const asyncSubscriptions = {
  PROFILE_VISITS: {
    enabled: true,
    subscribed: false,
    pollEvery: standardSubscriptionPollDelay,
    model: false,
  },
  PROFILE_VIEWS: {
    enabled: false,
    subscribed: false,
    pollEvery: standardSubscriptionPollDelay,
    model: false,
  },
  INTERESTING_CONNECTIONS: {
    enabled: true,
    subscribed: false,
    pollEvery: standardSubscriptionPollDelay,
    model: false,
  },
  LOGGED_IN_USER_INFO: {
    enabled: true,
    subscribed: false,
    pollEvery: 60000,
    model: false,
  },
  SESSION_EXPIRY: {
    enabled: true,
    subscribed: false,
    pollEvery: sessionValidityPollDelay,
    model: true,
  },
};
