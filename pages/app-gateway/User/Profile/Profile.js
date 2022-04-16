import React from "react";

function Profile(props) {
 console.log(props);
  return <div>Profile {props.owner.toString()}</div>;
}

export default Profile;
