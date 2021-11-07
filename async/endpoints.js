export const ENDPOINTS={
    TOP_COURSES:'public/topCourses',
    REGISTRATION:{
        SIGN_UP:'user/create/initial'
    },
    LOGIN:{
        SIGN_IN:'authenticate',
        SOCIAL_SIGN_IN:{
            GOOGLE:"/public/continueWithGoogle"
        }
    }
}
export const EXTERNAL_FULLY_QUALIFIED_ENDPOINTS={
    IP_DATA:process.env.NEXT_PUBLIC_IP_INFO_ENDPOINT
}