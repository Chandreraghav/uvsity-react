import { Tooltip } from "@material-ui/core";
import React, { useRef } from "react";
import { USER_PROFILE } from "../../../../constants/userdata";
import { IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

function ChangeProfilePicture(props) {
  const picture = useRef(null);

  const handleFileOnChange = () => {
    picture.current.click();
  };
  const onPictureChange = (event) => {
    if (props.consumeEvent) {
      props.consumeEvent(event);
    }
  };

  return (
    <>
      <input
        ref={picture}
        onChange={(event) => onPictureChange(event)}
        className="hidden"
        type="file"
        id="picture"
        name="profilePicture"
        accept="image/*"
      />
      {props?.large ? (
        <>
          <div className=" absolute mt-36 z-50  flex">
            <div className=" rounded-xl bg-pink ml-40  ">
              <Tooltip title={USER_PROFILE.CHANGE_PROFILE_PICTURE}>
                <IconButton
                  onClick={handleFileOnChange}
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  
                  <PhotoCamera fontSize="large" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </>
      ) : (
        <>
        <div className=" absolute mt-16 z-50  flex">
            <div className=" rounded-2xl bg-pink ml-20  ">
              <Tooltip title={USER_PROFILE.CHANGE_PROFILE_PICTURE}>
                <IconButton
                  onClick={handleFileOnChange}
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  
                  <PhotoCamera fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ChangeProfilePicture;
