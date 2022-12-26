import { Avatar } from '@mui/material'
import { useRouter } from 'next/router';
import React from 'react'
import { IMAGE_PATHS } from '../../../constants/userdata';
import { avatarToString } from '../../../utils/utility';
import { navigateToProfile } from './Navigator';
function SearchRollDown(props) {
    const router = useRouter();
    const handleClickOnProfile = (e, oid) => {
        if (oid) {
            if (props.onUserClicked) {
                props.onUserClicked(true)
            }
            navigateToProfile(Number(oid), router)
        }
    }
    const handleClickOnCourse = (e, oid) => {
        if (oid) {
            if (props.onUserClicked) {
                props.onUserClicked(true)
            }
            // navigateToProfile(Number(oid), router)
        }
    }
    const handleClick = (e, oid) => {
        if (props.type === 'User_Profile') {
            handleClickOnProfile(e, oid)
        }
        else if (props.type === 'Course') {
            handleClickOnCourse(e, oid)
        }
    }
    return (
        <>
            <div onClick={(e) => handleClick(e, props.data.entityId)} className='flex gap-1  cursor-pointer'>
                {/* AVATAR */}
                <div className="avatar flex  flex-shrink-0 w-12 h-12 rounded-full bg-brand-grey-200 dark:bg-brand-grey-700">
                    {props.noAvatarCheck ? (<Avatar className="avatar-xs" alt={`${props.data.content}`} src={props.data?.imageURL} />
                    ) : props.data.imageURL !== "" && !props.data.imageURL?.includes(IMAGE_PATHS.NO_PROFILE_PICTURE) ? (
                        <Avatar className="avatar-xs" alt={`${props.data.content}`} src={props.data.imageURL} />
                    ) : (
                        <Avatar className="avatar-xs" {...avatarToString(`${props.data.content}`)} />
                    )}
                </div>
                {/* CONTENT */}
                <div
                    className={`text-sm font-semibold app__anchor__no__color leading-tight name flex flex-row flex-wrap -mt-2 items-center mb-px`}
                >
                    <span className="name">{props.data.content}</span>
                </div>
            </div>

        </>
    )
}

export default SearchRollDown