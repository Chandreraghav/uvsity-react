import { Tooltip } from "@material-ui/core";
import React, { useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { USER_PROFILE } from "../../../../constants/userdata";

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
          <div className=" absolute mt-36 z-50  ml-2 place-content-center justify-center items-center flex ">
            <div className="cursor-pointer py-3  justify-center border-0  border-r-8 border-separate outline-none flex gap-1 bg-white opacity-60 h-16 w-48">
              <Tooltip title={USER_PROFILE.CHANGE_PROFILE_PICTURE}>
                <div
                  htmlFor="picture"
                  onClick={handleFileOnChange}
                  className="flex justify-center text-sm gap-1 app__anchor__block font-semibold text-gray-600"
                >
                  <EditIcon className="mt-1" sx={{ fontSize: 16 }} /> Change
                </div>
              </Tooltip>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" absolute mt-16 z-50  ml-4 place-content-center justify-center items-center flex ">
            <div className="cursor-pointer py-1 px-3  border-0  border-r-8 border-separate outline-none flex gap-1 bg-white opacity-60 h-8 w-28">
              <Tooltip title={USER_PROFILE.CHANGE_PROFILE_PICTURE}>
                <div
                  htmlFor="picture"
                  onClick={handleFileOnChange}
                  className="flex justify-center text-xs app__anchor__block text-gray-600"
                >
                  <EditIcon className="mt-0.5" sx={{ fontSize: 12 }} /> Change
                </div>
              </Tooltip>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ChangeProfilePicture;
