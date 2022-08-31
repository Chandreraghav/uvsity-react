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
  SEARCH:{
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
          ADD:'edit/profile/add/pasteducation'
        }
      }
    },
    METADATA: {
      ROOT: "/courses/metadata",
      STATIC: "/courses/staticmetadata",
    },
    
    
    
  },
  METADATA:{
    GET_COUNTRIES:'/data/countries'
  }

};
export const EXTERNAL_FULLY_QUALIFIED_ENDPOINTS = {
  IP_DATA: process.env.NEXT_PUBLIC_IP_INFO_ENDPOINT,
  GET_COUNTRIES:process.env.NEXT_PUBLIC_COUNTRIES_INFO_ENDPOINT
};

