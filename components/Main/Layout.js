import React from "react";
import CommonMetaInfo from "../shared/CommonMetaInfo";
import RootChain from "../Auth/HOC/RootChain";
const Layout = (props) => {
  const options = {
    title: props?.options?.title,
    desc: props?.options?.desc,
    poster: props?.options?.poster
  };
  return props?.private ? (
    <>
      <RootChain>
        <div className={`${props.lowZoom ? "app__body" : ""} dark:bg-gray-950 dark:text-gray-300`}>
          <CommonMetaInfo options={options} />
          <div>{props.children}</div>
        </div>
      </RootChain>
    </>
  ) : (
    <>
      <div className={`dark:bg-gray-950 dark:text-gray-300`}>
        <CommonMetaInfo options={options} />
        <div>{props.children}</div>
      </div>
    </>
  );
};
export default Layout;
