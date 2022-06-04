export const standardSubscriptionPollDelay = 600000;
export const sessionValidityPollDelay = 60000;
export const standardStaleTime=5000
export const infinity = Infinity;
export const asyncSubscriptions = {
  PROFILE_VISITS: {
    enabled: true,
    subscribed: false,
    pollEvery: standardSubscriptionPollDelay,
    model: false,
    staleTime: 5000 // 2 minutes
  },
  PROFILE_VIEWS: {
    enabled: false,
    subscribed: false,
    pollEvery: standardSubscriptionPollDelay,
    model: false,
    staleTime: 5000 // 2 minutes
  },
  INTERESTING_CONNECTIONS: {
    enabled: true,
    subscribed: false,
    pollEvery: standardSubscriptionPollDelay,
    model: false,
    staleTime: 5000 // 5 minutes
  },
  LOGGED_IN_USER_INFO: {
    enabled: true,
    subscribed: false,
    pollEvery: 60000,
    model: false,
    staleTime: 5000 // 5 minutes
  },
  SESSION_EXPIRY: {
    enabled: true,
    subscribed: false,
    pollEvery: sessionValidityPollDelay,
    model: true,
    staleTime:5000 // 0.5 minute
  },
};
