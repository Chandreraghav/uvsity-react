import React, { useEffect, useState } from "react";
import { AuthService } from "../../pages/api/users/auth/AuthService";
import CommonMetaInfo from "../shared/CommonMetaInfo";
const Layout = (props) => {
  const options = {
    title: props?.options?.title,
    desc: props?.options?.desc,
    poster: props?.options?.poster,
  };
  const [loggedIn, setLoggedIn] = useState(props.lowZoom);
  useEffect(() => {
    if(!loggedIn)
    setLoggedIn(AuthService.isUserLoggedIn());
  }, []);

  return (
        <div className={`${loggedIn ? "app__body" : ""} app`}>
          <CommonMetaInfo options={options} />
          <div>{props.children}</div>
        </div>
       
    )
  
};
export default Layout;
