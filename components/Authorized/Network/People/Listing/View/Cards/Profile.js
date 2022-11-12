import React from 'react'
import PeekProfile from '../../../Peek/Profile'

function Profile(props) {
    const handleMessageEvent = (obj) => {
        if (props.messageEvent) {
            props.messageEvent(obj)
        }
    }
    const addToNetwork = (obj) => {
        if (props.addToNetwork) {
            props.addToNetwork(obj)
        }
    }

    const acceptRequest = (obj) => {
        if (props.acceptRequest) {
            props.acceptRequest(obj)
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
                addToNetwork={addToNetwork}
                acceptRequest={acceptRequest}
                listed={props.listed}
            />
        </>
    )
}

export default Profile