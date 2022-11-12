import React from 'react'
import PeekProfile from '../../../Peek/Profile'

function Profile(props) {
    const handleMessageEvent = (obj) => {
        if (props.messageEvent) {
            props.messageEvent(obj)
        }
    }
    return (
        <>
            <PeekProfile
                isOpen={props.isOpen}
                connected={props.connected}
                workflow={props.workflow}
                fullWidth={props.fullWidth}
                options={props.options}
                metaData={props.metaData}
                isConnectToPersonOptionShown={props.isConnectToPersonOptionShown}
                isAcceptPersonRequestOptionShown={
                    props.isAcceptPersonRequestOptionShown
                }
                isConnectionRequestSent={props.isConnectionRequestSent}
                isConnectionAcceptRequestSent={
                    props.isConnectionAcceptRequestSent
                }
                isConnectionRequestInProgress={
                    props.isConnectionRequestInProgress
                }
                isConnectionAcceptRequestInProgress={
                    props.isConnectionAcceptRequestInProgress
                }
                isConnectionRequestSendError={props.isConnectionRequestSendError}
                isConnectionAcceptRequestSendError={
                    props.isConnectionAcceptRequestSendError
                }
                dark={props.dark}
                data={props.data}
                messageEvent={handleMessageEvent}
            />
        </>
    )
}

export default Profile