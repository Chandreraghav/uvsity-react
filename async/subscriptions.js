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
    staleTime: 5000, // 5 seconds
    alias:'PROFILE_VISITS',
  },
  PROFILE_VIEWS: {
    enabled: false,
    subscribed: false,
    pollEvery: standardSubscriptionPollDelay,
    model: false,
    staleTime: 5000 // 5 seconds
  },
  INTERESTING_CONNECTIONS: {
    enabled: true,
    subscribed: false,
    pollEvery: standardSubscriptionPollDelay,
    model: false,
    staleTime: 5000 // 5 seconds
  },
  LOGGED_IN_USER_INFO: {
    enabled: true,
    subscribed: false,
    pollEvery: 60000,
    model: false,
    staleTime: 5000 // 5 seconds
  },
  SESSION_EXPIRY: {
    enabled: true,
    subscribed: false,
    pollEvery: sessionValidityPollDelay,
    model: true,
    staleTime:5000 // 5 seconds
  },
};
