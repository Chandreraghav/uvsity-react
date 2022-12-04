/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { IMAGE_PATHS } from '../../../../constants/userdata'
function PreviewCoverDetail(props) {
    if (!props.cover) return (<></>)
    return (
        <div className=" bg-gray-100 dark:bg-gray-950 bg-center mb-2 border-0 p-2  shadow-md bg-repeat-round rounded-lg">
            {props.bgBlur ? (
                <div className="relative">
                    <img alt="courseImg" className="w-full absolute  left-0 top-0 xl:h-48 lg:h-48 blur-sm scale-100" src={
                        props.cover?.images?.poster
                            ? props.cover?.images?.poster
                            : IMAGE_PATHS.NO_DATA.EVENT_POSTER
                    } />

                    <img alt="courseImg"
                        className=" relative mx-auto w-3/4 block overflow-hidden  xl:h-48 lg:h-48  object-contain xl:object-cover lg:object-cover rounded-lg  "
                        src={
                            props.cover?.images?.poster
                                ? props.cover?.images?.poster
                                : IMAGE_PATHS.NO_DATA.EVENT_POSTER
                        }
                    />
                </div>) : (<>
                    <img alt="courseImg" className="w-full  block overflow-hidden  xl:h-48 lg:h-48  object-contain xl:object-cover lg:object-cover rounded-lg" src={
                        props.cover?.images?.poster
                            ? props.cover?.images?.poster
                            : IMAGE_PATHS.NO_DATA.EVENT_POSTER
                    } /></>)}
        </div>
    )
}

export default PreviewCoverDetail