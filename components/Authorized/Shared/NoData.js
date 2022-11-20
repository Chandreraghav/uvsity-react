import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { GENERIC_NO_DATA_ERROR } from "../../../constants/error-messages";

function NoData(props) {
  return (
    <div className="flex gap-1 flex-wrap">
      {props.lookUp ? (
        <CircularProgress
          size={20}
          color={props?.lookUp?.color ? props.lookUp.color : "inherit"}
        />
      ) : props.useInfoIcon ? (
        <InfoIcon sx={{ fontSize: 20, color: "darkgrey" }} />
      ) : (
        <SentimentDissatisfiedIcon sx={{ fontSize: 20, color: "darkgrey" }} />
      )}

      <Typography sx={{ fontSize: 14, color: "darkgrey" }}>
        {props.message || GENERIC_NO_DATA_ERROR}
      </Typography>
    </div>
  );
}

export default NoData;
