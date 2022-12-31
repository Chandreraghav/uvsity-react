export const AUTHORIZED_ROUTES={
   AUTHORIZED:{
    DASHBOARD: '/app-gateway/Landing',
    SESSION:{
       CREATE:"/app-gateway/Session/Create",
       PROFILE_INDEX:"/app-gateway/Session/"
    },
    PEOPLE:{
       PROFILE:'/app-gateway/User/Profile/',
       INDEX:'/app-gateway/People'
       
    },
    UTRN:{ // uvsity target resource name
      MYCONNECTIONS:'myconnections',
      PROFILE_VISITS:'profilevisits',
      ADD_TO_NETWORK:'addtonetwork'
    }
    
   }
    
}
export const DEFAULT_ROUTE={
   DASHBOARD: '/'
}