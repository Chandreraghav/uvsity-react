import React from 'react'
import Spacer from '../../../shared/Spacer';
import CoPresentIcon from "@mui/icons-material/CoPresent";
import { Tooltip } from '@mui/material';
import SnapProfile from '../../Network/People/Listing/Snap/Profile';
import EditIcon from "@mui/icons-material/Edit";

function CohostDetail(props) {
    if (!props.cohost) return (<></>)
    return (
        props.cohost && (

            <div
                className={` flex flex-col   gap-2     border-0 p-2  shadow-md bg-repeat-round rounded-lg  `}
            >
                <Spacer />
                <div className="text-md flex gap-2">
                    <CoPresentIcon className=" leading-3 font-semibold  text-xl text-gray-600" />{" "}
                    <span className="text-md leading-tight font-semibold text-gray-600">
                        Co-host
                    </span>
                    <div
                        className="flex text-blue-600
ml-auto app-anchor-block cursor-pointer"
                    >
                        <Tooltip title="Change">
                            <EditIcon
                                onClick={() => {
                                    props.onNavigate ? props.onNavigate(2) : null;
                                }}
                                fontSize="small"
                                className=" leading-3 font-semibold  text-sm"
                            />
                        </Tooltip>
                    </div>
                </div>
                <div className="flex">
                    <SnapProfile
                        firstName={props.cohost?.firstName}
                        lastName={props.cohost?.lastName}
                        avatar={props.cohost?.profilepicName}
                        oid={props.cohost?.userDetailsId}
                        userType={props.cohost?.userType}
                        instituition={props.cohost?.eduIns}
                    />
                </div>
            </div>
        )
    )
}

export default CohostDetail