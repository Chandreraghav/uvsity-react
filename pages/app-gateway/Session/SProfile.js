import React from 'react'
import MacroSessionProfile from '../../../components/Authorized/Sessions/MacroSessionProfile'

function SProfile(props) {
    return (
        <div className=" min-h-screen">


            <div
                className="  p-2
    grid items-stretch grid-cols-12  
    gap-2 px-2 mx-auto xl:container md:gap-4 
    xl:grid-cols-8 2xl:px-5 "
            >
                <div className="   col-span-12 md:pt-2">
                    {/* Main Content */}
                    <MacroSessionProfile
                        hasChangeEventTriggered={props?.hasChangeEventTriggered}
                        changeEvent={props?.changeEvent}
                        owner={props?.owner}
                        session_data={props?.session_data}
                        loggedInUser={props?.loggedInUser}
                    />
                </div>
            </div>
        </div>
    )
}

export default SProfile