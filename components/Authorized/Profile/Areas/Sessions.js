import { Button, Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { AUTHORIZED_ROUTES } from "../../../../constants/routes";
import { INTRO_ACTIONS } from "../../../../constants/userdata";
import { WORKFLOW_CODES } from "../../../../constants/workflow-codes";
import NoData from "../../Shared/NoData";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import SessionCard from "../../../SessionCards/SessionCard";
import { LOADING_MESSAGE_DEFAULT, SEE_MORE, SHIMMER_TIMEOUT_IN_MILLIS } from "../../../../constants/constants";
function Sessions(props) {
  const router = useRouter();
  const [dataSlice, setDataSlice] = useState(0);
  const [showShimmer, setShowShimmer] = useState(true);
  const dataSliceIncrement = 4;
  const [data, setData] = useState(null);
  const [slicedData, setSlicedData] = useState([]);
  useEffect(() => {
    if (props?.sessions?.error) return;
    setData(props?.sessions);
    let _slicedData = [];
    if (props?.sessions?.length >= dataSliceIncrement) {
      _slicedData = props?.sessions?.slice(0, dataSlice + dataSliceIncrement);
      setDataSlice(dataSliceIncrement);
    } else {
      _slicedData = props?.sessions;
    }

    setSlicedData(_slicedData);
    return () => {
      setData(null);
      setSlicedData([]);
      setDataSlice(0);
      setShowShimmer(true);
    };
  }, [props.sessions]);
  const handleSeeMore = () => {
    const _slicedData = props?.sessions?.slice(
      0,
      dataSlice + dataSliceIncrement
    );
    setSlicedData(_slicedData);
    if (showShimmer) setShowShimmer(false);
    setDataSlice(dataSlice + dataSliceIncrement);
  };
  const createSession = (code) => {
    if (code === WORKFLOW_CODES.USER.INTRO_PATHS.SESSION) {
      router.push({
        pathname: AUTHORIZED_ROUTES.AUTHORIZED.SESSION.CREATE,
        query: { token: uuidv4() },
      });
    }
  };
  return data && data.length > 0 ? (
    <>
      {slicedData ? (
        <>
          <div
            className={`lg:m-auto sm:grid sm:grid-cols-2 md:grid md:grid-cols-2 xl:grid xl:grid-cols-4 lg:grid lg:grid-cols-3 gap-4`}
          >
            {slicedData.map((_data) => (
              <SessionCard
                key={_data.courseId}
                data={_data}
                authorized
                shimmerTime={SHIMMER_TIMEOUT_IN_MILLIS}
                shimmer={showShimmer}
                origin="profile_timeline"
              />
            ))}
           
          </div>
          {data?.length > slicedData?.length && (
              <Typography
                onClick={handleSeeMore}
                className="app__anchor__block cursor-pointer read-or-hide"
                color="text.secondary"
              >
                {SEE_MORE}
              </Typography>
            )}
        </>
      ) : props?.sessions?.error ? (
        <>
          <NoData
            message={`${
              props?.owner
                ? "Some internal error occured while loading your sessions."
                : "Some internal error occured while loading this feed."
            }`}
          />
        </>
      ) : (
        <>{LOADING_MESSAGE_DEFAULT}</>
      )}
    </>
  ) : props?.sessions?.error ? (
    <>
      <NoData
        message={`${
          props?.owner
            ? "Some internal error occured while loading your sessions."
            : "Some internal error occured while loading this feed."
        }`}
      />
    </>
  ) : (
    <div className="flex flex-col space-y-2 mb-1">
      <NoData
        message={`${
          props?.owner
            ? "No sessions have been conducted yet by me."
            : `No sessions have been conducted yet by ${props?.creator}.`
        }`}
      />
      {props?.owner && (
        <>
          <Tooltip title={`${INTRO_ACTIONS[0].tooltip} now`}>
            <Button
              onClick={(e) => createSession(INTRO_ACTIONS[0].code)}
              variant="outlined"
              startIcon={INTRO_ACTIONS[0].icon}
              disabled={data?.length > 0}
            >
              {INTRO_ACTIONS[0].title}
            </Button>
          </Tooltip>
        </>
      )}
    </div>
  );
}

export default Sessions;
