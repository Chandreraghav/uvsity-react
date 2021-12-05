import * as React from "react";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Slide } from "@mui/material/Slide";
import { Tooltip } from "@mui/material";
import { WORKFLOW_CODES } from "../../../constants/workflow-codes";
import Profile from "../../Authorized/Network/People/Dashboard/Profile";
import UserDataService from "../../../pages/api/users/data/UserDataService";
import { handleResponse } from "../../../toastr-response-handler/handler";
import PeopleIcon from "@mui/icons-material/People";
import { toast } from "react-toastify";
import { formattedName, formattedProfileSubtitle, getTimezone, localTZDate } from "../../../utils/utility";
toast.configure();

export default function CustomDialog({
  isOpen,
  dialogCloseRequest,
  workflow_code,
  title,
  name,
  data,
  actions,
  theme,
}) {
  const [dataJsx, setDataJsx] = useState(null);
  const [titleJsx, setTitleJsx] = useState(null);
  useEffect(() => {
    let isSubscribed = true;
    let controller = new AbortController();
    populateDialogData(isSubscribed);
    populateDialogTitle();
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, [data]);
  if (!workflow_code || !title || !data || isOpen === undefined) {
    return <></>;
  }
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handleClose = () => {
    if (dialogCloseRequest) dialogCloseRequest();
  };

  
  const populateDialogTitle = () => {
    let jsx = [];
    if (data && workflow_code === WORKFLOW_CODES.PEOPLE.ATTENDING_SESSION) {
      const profilePrimaryLine = formattedName(data.creator.firstName, data.creator.lastName);
      const profileSecondaryLine = formattedProfileSubtitle(data.creator.userType, data.creator.educationalInstitute);
      const profileTertiaryLine = localTZDate(data.courseStartDTime)
      jsx.push(
        <>
        <div className="flex flex-col py-1 mb-1 gap-1">
        <div className="flex gap-1 text-sm">
          <div className="">by</div>
          <div>{profilePrimaryLine}</div>
          <div>|</div>
          <div>{profileSecondaryLine}</div>
          </div>

          <div className="flex gap-1 text-gray-400 text-xs">
          <div className="">on</div>
          <div>{profileTertiaryLine}({getTimezone()})</div>
          </div>
          </div>
        </>
      );
    }
    if (jsx.length > 0) setTitleJsx(jsx);
  };
  const populateDialogData = (isSubscribed) => {
    if (
      data &&
      workflow_code === WORKFLOW_CODES.PEOPLE.ATTENDING_SESSION &&
      isSubscribed
    ) {
      let jsx = [];
      UserDataService.getAttendeesPerCourse(data.courseId)
        .then((response) => {
          response.data?.users.map((user) => {
            user.invitationAction = {
              invitationAction: user.connectionStatus,
            };
            jsx.push(
              <Profile
                oid={user.userDetailsId}
                options={{ connect: false, mixedMode: true }}
                key={user.userDetailsId}
                firstName={user.firstName}
                lastName={user.lastName}
                avatar={user.profilePicName}
                userType={user.userType}
                instituition={user.educationalInstitute}
                metaData={user}
                origin={name}
              />
            );
          });
          Promise.all(jsx).then((response) => {
            if (jsx.length > 0) {
              setDataJsx(
                <>
                  <div
                    className={`flex gap-1 mb-1 dialog-subtitle font-medium text-sm`}
                  >
                    <PeopleIcon />
                    <div>People who are attending</div>
                  </div>
                  {jsx}
                </>
              );
            }
          });
        })
        .catch(() => {
          setDataJsx(<></>);
          handleClose();
          handleResponse(
            "There occured an internal error while trying to retrieve the attendees for this session. Please try again in sometime.",
            RESPONSE_TYPES.ERROR,
            toast.POSITION.BOTTOM_CENTER
          );
        });
    }
  };
  const isTitleALink=()=>{
    if(workflow_code===WORKFLOW_CODES.PEOPLE.ATTENDING_SESSION){
      return true
    }
    return false
  }
  return (
    <>
      <Dialog
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
        onBackdropClick={handleClose}
        onClose={handleClose}
        disableEscapeKeyDown
      >
        <div className={`${theme ? "dark-dialog" : ""}`}>
          <div className="flex justify-between">
            <div className={` px-4 py-3 leading-tight line-clamp-2 text-left font-bold flex-col`}>
              <Typography className={`${isTitleALink()?'dialog-title':''}`} gutterBottom variant="h6" component="div">
               {isTitleALink ? (<Tooltip title="View detail"><div>{title}{" "}</div></Tooltip>):(<>{title}{" "}</>)} 
              </Typography>
              <div>{titleJsx}</div>
            </div>
            <Tooltip title="close">
              <div>
                {handleClose ? (
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ marginTop: 2, color: `${theme ? "#e2e2e2" : ""}` }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                ) : null}
              </div>
            </Tooltip>
          </div>
          <div className="flex flex-col px-4 mb-2 -mt-3">
            {dataJsx && <div>{dataJsx}</div>}
          </div>
        </div>
      </Dialog>
    </>
  );
}
