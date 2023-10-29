import React from 'react'
import Spacer from '../../../shared/Spacer'
import SessionCard from '../../../SessionCards/SessionCard'
import { SHIMMER_TIMEOUT_IN_MILLIS, WORKFLOW_CODES } from '../../../../constants'

function OnlineSessions(props) {
    return (
        <div
            className=" min-h-screen  
grid items-stretch grid-cols-12  
gap-2 px-2 mx-auto xl:container md:gap-4 
xl:grid-cols-8 2xl:px-5 "
        >
            <div className="lg:mt-0 xl:mt-0 md:mt-0 -mt-10  col-span-12 md:col-span-3 lg:col-span-3 py-2 xl:col-span-2">
                {/* Sidebar filter */}
                <Spacer count={2} />
                {/* <MiniFooter showOnSmallScreens /> */}
                <Spacer count={2} />
            </div>
            <div className="z-40  col-span-12 md:pt-2 md:col-span-8 lg:col-span-8 xl:col-span-6">
                {props.data &&
                    (<div className="grid p-4 grid-cols-1 mb-16 md:mb-12 lg:mb-4 md:grid-cols-2 lg:grid-cols-2 gap-4">
                       
                        {props.data.map((_data) => (
                            <SessionCard
                                key={_data.courseId}
                                data={_data}
                                authorized={true}
                                shimmerTime={SHIMMER_TIMEOUT_IN_MILLIS}
                                shimmer={true}
                                origin={props.type}
                                workflow={WORKFLOW_CODES.USER.SESSION.VIEW}
                            />))}
                    </div>)
                }


            </div>

        </div>
    )
}

export default OnlineSessions