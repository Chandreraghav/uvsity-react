import React from "react";
import NoData from "../../Shared/NoData";
import SnapPreview from "../../Sessions/Preview/SnapPreview";

function RecommendedSessions(props) {
  return props?.sessions && props?.sessions.length > 0 ? (
    <>
      {props?.sessions?.map((session) => (
        <div key={session.courseId}>
          <SnapPreview session={session} />
        </div>
      ))}
    </>
  ) : (
    <NoData message="No sessions recommended." />
  );
}

export default RecommendedSessions;
