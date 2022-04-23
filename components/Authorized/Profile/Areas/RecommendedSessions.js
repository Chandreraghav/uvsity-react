import React from "react";
import NoData from "../../Shared/NoData";
import SnapPreview from "../../Sessions/Preview/SnapPreview";

function RecommendedSessions(props) {
  return props?.sessions && props?.sessions.length > 0 ? (
    <>
      <div className="flex flex-wrap gap-4 max-h-52 overflow-auto">
        {props?.sessions?.map((session) => (
          <div key={session.courseId}>
            <SnapPreview consumeEvent={props.consumeEvent} session={session} />
          </div>
        ))}
          
      </div>
    </>
  ) : (
    <NoData message="No sessions recommended." />
  );
}

export default RecommendedSessions;
