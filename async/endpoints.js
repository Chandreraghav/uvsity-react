export const ENDPOINTS = {
  TOPICS: {
    ALL_ACTIVE: "topic/allActive",
    GET_DETAIL: "topic/topic",
    SEND_COMMENT: "topic/create/topicComment",
    SEND_REPLY_COMMENT: "topic/reply/topicComment"
  },
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
    },
    ONLINE:'opencourses',
    FILTERS:'courses/filters'
    
  },
  SEARCH:{
    GENERIC:'universalsearch/',
    COMMON:{
      DATA:{
        USERTYPE:'data/filteredUserTypes?queryUsertype=',
        EDUINS:'data/filteredEducationalInstitutions?queryEduins=',
        COURSES:'universalsearch/courses/'
      }
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
        ATTENDEES:'universalsearch/attendees/',
        PEOPLE:"search"
      },
      VIEW:'view/profile/',
      MESSAGING:{
        SEND_RECOMMENDATION_REQUEST:'/inbox/send/recommendationRequest',
        SEND_MESSAGE:'/inbox/send/message',
        SEND_RATING:'inbox/send/rating',
        SEND_SESSION_REQUEST:'inbox/send/courseRequest'
      },
      
    },
    DETAILS: "/view/profile/",
    SESSION_BY_ID: "/courses/#X#",
    SESSION_BY_USER:'/view/profile/getData/coursesByUser/#X#/',
    SESSION_IS_ALLOWED:'/courses/allowed/',
    CREATE_SESSION:'/courses/',
    OWN_SESSIONS:'courses',
    ENROLLED_SESSION:'courses/enrolled',
    UPLOADS:{
      SESSION:{
        CREATE:{
          IMAGE:'/fileupload',
          DOC:'/slidedeck'
        }
       
      },
      PROFILE:{
        PICTURE:'/edit/profile/profilepic',
      }
      
    },
    EDITS:{
      ABOUT:'edit/profile/aboutMe',
      HEADLINE:'view/profile/secondaryData',
      INTERESTS:'edit/profile/myInterests',
      SKILLS:'edit/profile/userSkillsts',
      RECOMMENDED_SESSION:'edit/profile/coursesIRecommend',
      SOCIAL_PROFILE:{
        LINKEDIN:'edit/profile/linkedInProfile'
      },
      EDUCATION:{
        HIGHEST_DEGREE:'edit/profile/degreeCourse',
        PAST_EDUCATION:{
          DATA:'edit/profile/getData/pastEducations',
          ADD:'edit/profile/add/pasteducation',
          REMOVE:'edit/profile/delete/pasteducation',
          EDIT:'edit/profile/update/pasteducation'
        }
      },
      WORKEXPERIENCE:{
        DATA:'edit/profile/getData/projectResearchExperiences',
        ADD:'edit/profile/add/projectResearchExperience',
        EDIT:'edit/profile/update/projectResearchExperience',
        REMOVE:'edit/profile/delete/projectResearchExperience'
      },
      RECOMMENDATIONS:{
        DATA:'edit/profile/getData/userAcceptedRecommendations',
        CHANGE_PRIVACY:'edit/profile/userAcceptedRecommendations'
      }
    },
    METADATA: {
      ROOT: "/courses/metadata",
      STATIC: "/courses/staticmetadata",
    },
  },
  METADATA:{
    GET_COUNTRIES:'/data/countries'
  },
  MESSAGE: {
    ALL_INBOX_CONVERSATION: "inbox/allConversationsInInbox",
    ALL_INBOX_REQUEST: "inbox/allRequestsReceived",
    ALL_INBOX_RECOMMENDATION: "inbox/allRecommendationResponsesReceived",
    ALL_SENT_CONVERSATION: "inbox/allConversationsInSentItems",
    ALL_SENT_REQUEST: "inbox/allRequestsSent",
    ALL_SENT_RECOMMENDATION: "inbox/allRecommendationResponsesSent",
    TRASH: "inbox/retrieve/trashedEntries",
    CONVERSATION_DETAIL: "inbox/allMessagesInConversationForUserMessageContainerEntry",
    REPLY_MESSAGE: "inbox/send/replyToMessage"
  }
};
export const EXTERNAL_FULLY_QUALIFIED_ENDPOINTS = {
  IP_DATA: process.env.NEXT_PUBLIC_IP_INFO_ENDPOINT,
  GET_COUNTRIES:process.env.NEXT_PUBLIC_COUNTRIES_INFO_ENDPOINT
};

