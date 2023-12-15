export const AUTHORIZED_ROUTES={
   AUTHORIZED:{
    DASHBOARD: '/app-gateway/Landing',
    SESSION:{
       CREATE:"/app-gateway/Session/Create",
       VIEW:"/app-gateway/Sessions",
       PROFILE_INDEX:"/app-gateway/Session/"
    },
    PEOPLE:{
       PROFILE:'/app-gateway/User/Profile/',
       DISCOVER:'/app-gateway/Discover/People',
       INDEX:'/app-gateway/People'
       
    },
    UTRN:{ // uvsity target resource name
      CONNECTIONS:'connections',
      PROFILE_VISITS:'profilevisits',
      ADD_TO_NETWORK:'addtonetwork',
      OWN_SESSIONS:'mysessions',
      ONLINE_SESSIONS:'onlinesessions',
      ENROLLED_SESSIONS:'enrolledsessions'
    },
    MESSAGES: '/app-gateway/Messages'
   }
    
}
export const DEFAULT_ROUTE={
   DASHBOARD: '/'
}