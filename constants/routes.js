export const AUTHORIZED_ROUTES={
   AUTHORIZED:{
    DASHBOARD: '/app-gateway/Landing',
    SESSION:{
       CREATE:"/app-gateway/Session/Create"
    },
    PEOPLE:{
       PROFILE:'/app-gateway/User/Profile/',
       INDEX:'/app-gateway/People'
       
    },
    UTRN:{ // uvsity target resource name
      MYCONNECTIONS:'myconnections',
      PROFILE_VISITS:'profileVisits',
      ADD_TO_NETWORK:'addToNetwork'
    }
    
   }
    
}
export const DEFAULT_ROUTE={
   DASHBOARD: '/'
}