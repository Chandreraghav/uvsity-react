import React, { useEffect, useState } from 'react'
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { Tooltip, Typography } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import Plans from '../../Sponsorships/Plans';
import { SPONSORSHIP } from '../../../../constants/userdata';

function SponsorshipDetail(props) {
    const [sponsorshipLevels, setSponsorshipLevels] = useState([])
    useEffect(() => {
        setSponsorshipLevels(props?.sponsor?.sponsorshipLevels && props?.sponsor?.sponsorshipLevels instanceof Array && props?.sponsor?.sponsorshipLevels.length > 0 ? props?.sponsor?.sponsorshipLevels : SPONSORSHIP?.LEVELS)
          }, [props?.sponsor?.sponsorshipLevels])
    if (!props.sponsor) return (<></>)

    return (
        props.sponsor?.sponsorShipInd && (
            <div className="flex flex-col gap-2 py-3">
                <div className="flex gap-1">
                    <AutoAwesomeOutlinedIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                    <Typography
                        variant="div"
                        className=" mb-1 font-semibold line-clamp-1 text-md  leading-snug text-gray-600"
                    >
                        Sponsorship Levels:
                    </Typography>

                    <div
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
                    </div>
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
            </div>
        )
    )
}

export default SponsorshipDetail