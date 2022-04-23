import { Tooltip, Typography } from "@mui/material";
import React from "react";
import { IMAGE_PATHS } from "../../../../constants/userdata";

function SnapPreview(props) {
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
          <div className="line-clamp-1 leading-snug">
            <Typography sx={{ fontSize: 15, color: "#111" }}>
              {props.session.courseName}
            </Typography>
          </div>
        </Tooltip>
        <div>Sw</div>
            </div>
     
      </div>
     
    </>
  );
}

export default SnapPreview;
