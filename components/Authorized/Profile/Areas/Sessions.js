import React from "react";
import NoData from "../../Shared/NoData";

function Sessions(props) {
    console.log(props?.sessions)
  return props?.sessions ? (
    <div>Sessions</div>
  ) : (
    <NoData
      message={`${
        props?.owner
          ? "No sessions have been conducted yet by me."
          : "No sessions have been conducted yet."
      }`}
    />
  );
}

export default Sessions;
