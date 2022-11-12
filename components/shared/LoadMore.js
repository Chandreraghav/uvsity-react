import { Typography } from '@mui/material'
import React from 'react'
import { LOADING_MESSAGE_DEFAULT, LOAD_MORE } from '../../constants/constants'

function LoadMore(props) {
    const handleLoadMore = (event) => {
        if (props.event)
            props.event({ event: 'loadMore' })

    }
    return (
        <div onClick={handleLoadMore} className={`px-4 mx-auto ${!props?.loadingMore ? "cursor-pointer opacity-100" : ' opacity-50'}`}>
            <Typography className=" leading-snug dark:text-gray-500 text-gray-900 " variant="subtitle1">{!props?.loadingMore ? LOAD_MORE : LOADING_MESSAGE_DEFAULT}</Typography>
        </div>
    )
}

export default LoadMore