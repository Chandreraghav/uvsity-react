import React from "react";
import CommonMetaInfo from "../shared/CommonMetaInfo";
const Layout = (props) => {
  const options={
    title:props?.options?.title,
    desc:props?.options?.desc,
    poster:props?.options?.poster
  }
  return (
    <div className="app">
      <CommonMetaInfo options={options} />
      <div>{props.children}</div>
    </div>
  );
};
export default Layout;
