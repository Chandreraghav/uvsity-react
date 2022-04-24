export const WORKFLOW_CODES = {
  USER: {
    ACCOUNT_SETTINGS: {
      UPGRADE: "AS_UPGR",
      EARNING: "AS_EARN",
      ACCOUNT: "AS_ACCO",
      EXIT: "AS_EXIT",
    },
    PROFILE: {
      EDIT: "P_EDIT",
      REQUEST_RECOMMENDATION: "P_REQR",
    },
    SESSION: {
      REGISTER: "S_REG",
      SPONSOR: "S_SPO",
      VIEW: "S_VIE",
      FEED: "S_FEE",
      CREATE: "S_CRE",
      SUBMITTED:'Submitted',
      VISIBILITY:{
        PUBLIC:'Public',
        PRIVATE:'Private'
      },
      FEE:{
        PAID:'Paid',
        FREE:'Free'
       },
       SEVERITY:{
         GREEN:"green"
       },
      LOAD:'SESS_LOAD',
    },
    SPONSORSHIP: {
      EDITS: {
        FEATURES: {
          SILVER: "SE_SIL",
          GOLD: "SE_GLD",
          PLATINUM: "SE_PLT",
        },
      },
    },
    ADHOC_LINKS_OPENER:{
        CALENDAR:'ADHOC_CAL_OPEN'
    },
    

    CONNECTION_TYPES: {
      STUDENT: "CT_STUD",
      ALUMNI: "CT_ALUM",
      PROFESSOR: "CT_PROF",
    },
    INTRO_PATHS: {
      SESSION: "IP_SESS",
      TOPIC: "IP_TOPI",
    },
  },
  PEOPLE: {
    WHO_VIEWED_ME: "P_WHOV",
    WHO_ARE_INTERESTING: "P_WHOI",
    PROFILE_VIEW: "P_PROV",
    ATTENDING_SESSION: "P_ATTS",
  },
};
