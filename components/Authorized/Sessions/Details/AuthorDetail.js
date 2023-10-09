import { Box } from '@mui/material'
import React from 'react'
import Spacer from '../../../shared/Spacer'
import Profile from '../../Network/People/Dashboard/Profile'

function AuthorDetail(props) {
      
    
    if (!props.author) return (<></>)
    
    return (
        <React.Fragment>
            <div className="sm:block md:block lg:hidden xl:hidden"><Spacer count={4} /></div>

            <Box className="flex relative border-0 p-2  shadow-md bg-repeat-round rounded-lg">
                <Profile
                    owner={props.owner}
                    oid={props.author?.userDetailsId}
                    options={{ connect: false, mixedMode: true }}
                    firstName={props.author?.firstName}
                    lastName={props.author?.lastName}
                    avatar={props.author?.profilePicName}
                    userType={props.author?.userType}
                    instituition={
                        props.author?.educationalInstitute
                    }
                    metaData={props.author}
                    userdata={props.author}
                />
            </Box>
        </React.Fragment>
    )
}

export default AuthorDetail