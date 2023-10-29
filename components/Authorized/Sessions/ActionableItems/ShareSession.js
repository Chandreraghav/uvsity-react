import { Stack, Tooltip } from '@mui/material'
import React from 'react'
import { SESSION } from '../../../../constants'
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
} from 'next-share'
import CopyToClipboard from '../../../shared/CopyToClipboard'
import { useClientDevice } from '../../../Device/HOC/ClientDeviceProvider'
function ShareSession(props) {
    const {
        isExtraSmallScreen,
        isSmallScreen,

    } = useClientDevice();

    const updatedShareOptions = SESSION.SHARE_OPTIONS.map((action) => {

        const jsx = action.type === 'facebook' ? (
            <Tooltip title={action.title} arrow>
                <div>
                    <FacebookShareButton
                        url={props.url}
                        quote={props.quote}
                        hashtag={action.hashtag}
                    >
                        <FacebookIcon size={(isSmallScreen || isExtraSmallScreen) ? 24 : 32} round />
                    </FacebookShareButton>
                </div>

            </Tooltip>

        ) : (
            <Tooltip title={action.title} arrow>
                <div>
                    <TwitterShareButton
                        url={props.url}
                        title={props.quote}
                        hashtags={[action.hashtag]}
                    >
                        <TwitterIcon size={(isExtraSmallScreen || isSmallScreen) ? 24 : 32} round />
                    </TwitterShareButton>
                </div>
            </Tooltip>
        );
        // Return the updated action object
        return { ...action, jsx };
    });

    // Render the updated share buttons
    return (<>
        <Stack direction="row" spacing={2}>

            {updatedShareOptions.map((action, index) => (
                <div className="cursor-pointer" key={action.id}>
                    {action.jsx}
                </div>
            ))}
            {props.copyToClipboard && (<><CopyToClipboard title='Copy link' smallerIcon={(isExtraSmallScreen || isSmallScreen) ? true : false} copyText={props.url} /></>)}
        </Stack>
    </>)
}

export default ShareSession