import React from "react";
import NoData from "../../Shared/NoData";
import SnapPreview from "../../Sessions/Preview/SnapPreview";

function RecommendedSessions(props) {
  return props?.sessions && props?.sessions.length > 0 ? (
    <>
      <div className="flex flex-wrap gap-4">
        {props?.sessions?.map((session) => (
          <div key={session.courseId}>
            <SnapPreview session={session} />
          </div>
        ))}
      </div>
    </>
  ) : (
    <NoData message="No sessions recommended." />
  );
}

export default RecommendedSessions;
