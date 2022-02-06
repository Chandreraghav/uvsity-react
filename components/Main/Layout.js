import React from "react";
import { AuthService } from "../../pages/api/users/auth/AuthService";
import CommonMetaInfo from "../shared/CommonMetaInfo";
const Layout = (props) => {
  const options={
    title:props?.options?.title,
    desc:props?.options?.desc,
    poster:props?.options?.poster
  }
const isLoggedIn= AuthService.isUserLoggedIn()
  return (
    <div className={`${isLoggedIn?'app__body':''} app`}>
      <CommonMetaInfo options={options} />
      <div>{props.children}</div>
    </div>
  );
};
export default Layout;
