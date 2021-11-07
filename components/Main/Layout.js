import React from "react";
import CommonMetaInfo from "../shared/CommonMetaInfo";
const Layout = (props) => {
  return (
    <div className="app">
      <CommonMetaInfo title={props.title} />
      <div>{props.children}</div>
    </div>
  );
};
export default Layout;
