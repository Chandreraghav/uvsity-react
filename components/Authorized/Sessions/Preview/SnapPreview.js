import { Tooltip, Typography } from "@mui/material";
import React from "react";
import { IMAGE_PATHS } from "../../../../constants/userdata";
import SnapProfile from "../../Network/People/Listing/Snap/Profile";

function SnapPreview(props) {
  const handleOnProfileView = (obj) => {
    if (props.consumeEvent) {
      props.consumeEvent(obj, "RecommendedSessions");
    }
  };
  return (
    <>
      <div className="flex gap-2">
        <img
          className=" w-12 h-12 bg-center bg-cover rounded post-cover thumbnail overflow-hidden  bg-gray-100"
          src={
            props?.session?.courseImageURL
              ? props?.session?.courseImageURL
              : IMAGE_PATHS.NO_DATA.EVENT_POSTER
          }
          alt={props.session.courseName}
          loading="lazy"
        />
        <div className="flex flex-col">
          <Tooltip title={props.session.courseName}>
            <div className=" app__anchor__block cursor-pointer line-clamp-1 leading-snug">
              <Typography sx={{ fontSize: 15, color:'#5271ff' }}>
                {props.session.courseName}
              </Typography>
            </div>
          </Tooltip>
          {props.session?.courseCreator && (
            <>
              <div>
                <SnapProfile
                  onProfileViewRequest={handleOnProfileView}
                  origin={"recommended_session_author"}
                  firstName={props.session.courseCreator?.firstName}
                  lastName={props.session.courseCreator?.lastName}
                  oid={props.session.courseCreator?.userDetailsId}
                  userType={props.session.courseCreator?.userType}
                  instituition={
                    props.session.courseCreator?.educationalInstitution
                  }
                  campus={props.session.courseCreator?.campus}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SnapPreview;
