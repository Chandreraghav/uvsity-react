import React, { useEffect, useState } from 'react'
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { Tooltip, Typography } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import Plans from '../../Sponsorships/Plans';
import { SPONSORSHIP } from '../../../../constants/userdata';
import SponsorSession from '../ActionableItems/SponsorSession';
function SponsorshipDetail(props) {

    const [sponsorshipLevels, setSponsorshipLevels] = useState([])
    useEffect(() => {
        setSponsorshipLevels(props?.sponsor?.sponsorshipLevels && props?.sponsor?.sponsorshipLevels instanceof Array && props?.sponsor?.sponsorshipLevels.length > 0 ? props?.sponsor?.sponsorshipLevels : SPONSORSHIP?.LEVELS)
    }, [props?.sponsor?.sponsorshipLevels])
    if (!props.sponsor) return (<></>)

    return (

        // If session has been chosen to be looking for sponsorships.
        props.sponsor?.sponsorShipInd && (
            <div className="flex flex-col gap-2 py-3">
                {props.owner === true && (<>
                    <div className="flex gap-1">
                        <AutoAwesomeOutlinedIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                        <Typography
                            variant="div"
                            className=" mb-1 font-semibold line-clamp-1 text-md  leading-snug text-gray-600"
                        >
                            Sponsorship Levels:
                        </Typography>
                        {props.owner === true && (<div
                            className="flex mr-2 text-blue-600
ml-auto app-anchor-block cursor-pointer"
                        >
                            <Tooltip title="Change">
                                <EditIcon
                                    onClick={() => {
                                        props.onNavigate ? props.onNavigate(3) : null;
                                    }}
                                    fontSize="small"
                                    className=" leading-3 font-semibold  text-sm"
                                />
                            </Tooltip>
                        </div>)}

                    </div>

                    <div className="flex gap-2  lg:ml-0 md:ml-0">

                        {sponsorshipLevels?.map((level) => (
                            <Plans
                                showOnlyHeader={true}
                                key={level.id}
                                data={level}
                                dark={props?.isDark}
                                showOnlyHTML={props?.sponsor?.viewSponsorshipsFromSessionProfile}
                            />
                        ))
                        }


                    </div>
                </>)}

                {props.showSponsorshipAction===true && (<React.Fragment>
                    {/* For owner user, the sponsorship button will be always there */}
                    {props.oid !== undefined && props.owner === true && (<SponsorSession oid={props.oid} />)}
                    {/* For non-owner of session, we check if the user has already registered to the session, if yes then only we show the Sponsor Session button  */}
                    {props.oid !== undefined && (props.owner === undefined || props.owner === false) && props.userRegistered === true && (<SponsorSession oid={props.oid} />)}
                    {/* Both above conditions are mutually exclusive*/}
                </React.Fragment>)}

            </div>
        )
    )
}

export default SponsorshipDetail