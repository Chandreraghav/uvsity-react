export const ENDPOINTS = {
  TOP_COURSES: "public/topCourses",
  REGISTRATION: {
    SIGN_UP: "user/create/initial",
  },
  LOGIN: {
    SIGN_IN: "authenticate",
    SOCIAL_SIGN_IN: {
      GOOGLE: "/public/continueWithGoogle",
    },
  },
  SESSION: {
    POLLER: {
      VALIDITY_CHECK: "/poll/sessionExpiryCheck",
    },
    SCHEDULED_END_DATE:"/courses/scheduledEndDate",
    QUESTIONAIRRE:{
      CREATE:'questionnaire/create',
      UPDATE:'questionnaire/update',
      GET:'questionnaire/',
      DELETE:'questionnaire/delete/'
    }
  },

  USER: {
    LOGGED_IN_INFO: "/poll/getLoggedInUser",
    HOMEPAGE: {
      SUMMARY: "/homepage/userSummary",
      PROFILE_PERCENTAGE_COMPLETION: "/homepage/profilePerecentageCompletion",
      PROFILE_VISITS: "/homepage/poll/profileVisits",
      SUGGESTED_FRIENDS: "/homepage/poll/suggestedFriends",
      NETWORK_UPDATES: "/homepage/poll/networkUpdates",
      HOT_TOPICS: "/homepage/poll/hotTopics",
      TOP_COURSES: "/homepage/poll/topCourses",
    },
    SIGN_OUT: "/logOff",
    PEOPLE: {
      NETWORK: {
        ADD_REQUEST: "/inbox/send/invitationRequest",
        ACCEPT_REQUEST: "/inbox/accept/invitationRequest/",
      },
      ATTENDEES: "/course/#X#/attendees",
      SEARCH:{
        ATTENDEES:'universalsearch/attendees/'
      },
      VIEW:'view/profile/'
    },
    DETAILS: "/view/profile/",
    SESSION_BY_ID: "/courses/#X#",
    SESSION_BY_USER:'/view/profile/getData/coursesByUser/#X#/',
    SESSION_IS_ALLOWED:'/courses/allowed/',
    CREATE_SESSION:'/courses/',
    UPLOADS:{
      SESSION:{
        CREATE:{
          IMAGE:'/fileupload',
          DOC:'/slidedeck'
        }
       
      },
      PROFILE:{
        PICTURE:'/edit/profile/profilepic'
      }
      
    },
    METADATA: {
      ROOT: "/courses/metadata",
      STATIC: "/courses/staticmetadata",
    },
  },
  

};
export const EXTERNAL_FULLY_QUALIFIED_ENDPOINTS = {
  IP_DATA: process.env.NEXT_PUBLIC_IP_INFO_ENDPOINT,
};
