import React, { useState, useEffect } from "react";
import NoData from "../../Shared/NoData";

function Sessions(props) {
  const [dataSlice, setDataSlice] = useState(0);
  const dataSliceIncrement = 10;
  const [data, setData] = useState(null);
  const [slicedData, setSlicedData] = useState([]);
  useEffect(() => {
    setData(props?.sessions);
    const _slicedData = props?.sessions?.slice(
      0,
      dataSlice + dataSliceIncrement
    );
    setSlicedData(_slicedData);
    return () => {
      setData(null);
      setSlicedData([]);
    };
  }, [props.sessions]);

  return data ? (
    <>
      {slicedData ? (
        <>
          <div>
            {slicedData.map((_data) => (
              <div key={_data.courseId}>{_data?.courseFullName}</div>
            ))}
          </div>
        </>
      ) : (
        <>Loading...</>
      )}
    </>
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
