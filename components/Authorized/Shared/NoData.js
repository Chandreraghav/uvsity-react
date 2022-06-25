import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

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
        {props.message || "No data available"}
      </Typography>
    </div>
  );
}

export default NoData;
