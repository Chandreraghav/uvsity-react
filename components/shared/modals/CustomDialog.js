import * as React from "react";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Slide } from "@mui/material/Slide";
import { DialogTitle, Tooltip } from "@mui/material";
import { WORKFLOW_CODES } from "../../../constants/workflow-codes";
import Profile from "../../Authorized/Network/People/Dashboard/Profile";
import PeopleIcon from "@mui/icons-material/People";
import { toast } from "react-toastify";
import {
  formattedName,
  formattedProfileSubtitle,
  getTimezone,
  shouldDialogAppearInFullScreen,
  localTZDate,
} from "../../../utils/utility";
import {
  PLACEHOLDERS,
  TITLES,
  TOOLTIPS,
  ME,
} from "../../../constants/userdata";
import UserDataService from "../../../pages/api/users/data/UserDataService";
import { useQuery } from "react-query";
import { KEYS } from "../../../async/queries/keys/unique-keys";
import { infinity } from "../../../async/subscriptions";
import { navigateToProfile } from "../../Authorized/Shared/Navigator";
import { useRouter } from "next/router";
import { COLOR_CODES } from "../../../constants/constants";
toast.configure();

export default function CustomDialog({
  isOpen,
  dialogCloseRequest,
  workflow_code,
  title,
  name,
  data,
  secondaryData,
  actions,
  dark,
}) {
  const [isSticky, setSticky] = useState(false);
  const [dataJsx, setDataJsx] = useState(null);
  const [titleJsx, setTitleJsx] = useState(null);
  const router = useRouter();
  const getLoggedInInformation = async () =>
    (await UserDataService.getLoggedInInformation()).data;
  const USER_LOGIN_INFO = useQuery([KEYS.LOGIN.INFO], getLoggedInInformation, {
    refetchOnWindowFocus: false,
    staleTime: infinity,
  });
  const handleContentScroll = (o) => {
  };
  useEffect(() => {
    // document.getElementById('dialog-content').addEventListener("scroll", () => {
    //   const scrollheightLimit = 120;
    //   console.log(document.getElementById('dialog-content'))
    //   //document.getElementById('dialog-title').scroll
    //   if (window.scrollY > scrollheightLimit) {
    //     setSticky(true);
    //   } else {
    //     setSticky(false);
    //   }
    // });
    return () => {
      try {
        window.removeEventListener("scroll");
      } catch (error) {}
    };
  }, [data, secondaryData]);

  const isItMe = () => {
    const user_id = data?.userDetailsId || data?.creator?.userDetailsId;
    return user_id === USER_LOGIN_INFO?.data?.userDetailsId;
  };
  useEffect(() => {
    let isSubscribed = true;
    let controller = new AbortController();
    populateDialogData(isSubscribed);
    populateDialogTitle();
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, [secondaryData]);
  if (!workflow_code || !title || !data || isOpen === undefined) {
    return <></>;
  }
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handleClose = () => {
    if (dialogCloseRequest) dialogCloseRequest();
  };
  const goToProfile = () => {
    const user_id = data?.userDetailsId || data?.creator?.userDetailsId;
    navigateToProfile(user_id, router);
  };

  const populateDialogTitle = () => {
    let jsx = [];
    if (data && workflow_code === WORKFLOW_CODES.PEOPLE.ATTENDING_SESSION) {
      const profilePrimaryLine = formattedName(
        data.creator.firstName,
        data.creator.lastName
      );
      const profileSecondaryLine = formattedProfileSubtitle(
        data.creator.userType,
        data.creator.educationalInstitute
      );
      const profileTertiaryLine = localTZDate(data.displayStartDate);
      jsx.push(
        <>
          <div className="flex flex-col py-1 mb-1 gap-1">
            <div className="flex gap-1 text-sm">
              <div className="">by</div>
              <Tooltip
                title={
                  isItMe() ? TOOLTIPS.GO_TO_PROFILE : TOOLTIPS.VIEW_PROFILE
                }
              >
                <div
                  onClick={() => goToProfile()}
                  className="line-clamp-1 cursor-pointer app-anchor-block"
                >
                  {profilePrimaryLine}
                  {isItMe() && <>{ME}</>}
                </div>
              </Tooltip>
              {profileSecondaryLine && (
                <div className="-mt-0.3 text-gray-500">&#8739;</div>
              )}
              <div className="line-clamp-1">{profileSecondaryLine}</div>
            </div>

            <div className="flex gap-1 text-gray-700  dark:text-gray-400 text-xs">
              <div className="">on</div>
              <div
                className="line-clamp-1 "
                title={`${profileTertiaryLine}(${getTimezone()})`}
              >
                {profileTertiaryLine}({getTimezone()})
              </div>
            </div>
          </div>
        </>
      );
    }
    if (jsx.length > 0) setTitleJsx(jsx);
  };
  const populateDialogData = (isSubscribed) => {
    if (
      secondaryData &&
      workflow_code === WORKFLOW_CODES.PEOPLE.ATTENDING_SESSION &&
      isSubscribed
    ) {
      let jsx = [];
      secondaryData.forEach((user, idx) => {
        user.invitationAction = {
          invitationAction: user.connectionStatus,
        };
        jsx.push(
          <Profile
            oid={user.userDetailsId}
            options={{ connect: false, mixedMode: true }}
            firstName={user.firstName}
            lastName={user.lastName}
            avatar={user.profilePicName}
            userType={user.userType}
            instituition={user.educationalInstitute}
            metaData={user}
            origin={name}
            userdata={USER_LOGIN_INFO?.data}
            dark={dark}
          />
        );
      });
      Promise.all(jsx).then((response) => {
        if (jsx.length > 0) {
          setDataJsx(
            <>
              {jsx.map((val, idx) => (
                <div key={`${idx}-attendee`}>{val}</div>
              ))}
            </>
          );
        }
      });
    }
  };
  const isTitleALink = () => {
    if (workflow_code === WORKFLOW_CODES.PEOPLE.ATTENDING_SESSION) {
      return true;
    }
    return false;
  };
  return (
    <>
      <Dialog
        fullScreen={shouldDialogAppearInFullScreen()}
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
        onBackdropClick={handleClose}
        onClose={handleClose}
        disableEscapeKeyDown
      >
        <DialogTitle
          sx={{
            backgroundColor: dark ? "#111" : "#fff",
            color: dark ? "#fff" : "#111",
          }}
        >
          <div className={`flex justify-between `}>
            <div className={`  leading-tight  text-left font-bold flex-col`}>
              <Typography
                className={`${
                  isTitleALink() ? "dialog-title" : ""
                } line-clamp-1`}
                gutterBottom
                variant="h6"
                component="div"
              >
                {isTitleALink ? (
                  <Tooltip
                    title={`${
                      workflow_code === WORKFLOW_CODES.PEOPLE.ATTENDING_SESSION
                        ? title
                        : PLACEHOLDERS.VIEW_DETAIL
                    }`}
                  >
                    <div>{title || "Title"} </div>
                  </Tooltip>
                ) : (
                  <>{title || "Title"} </>
                )}
              </Typography>
              {titleJsx && <div>{titleJsx}</div>}
            </div>
            <Tooltip title="close">
              <div>
                {handleClose ? (
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ marginTop: 2, color: `${dark ? COLOR_CODES.GRAY.DEEP : ""}` }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                ) : null}
              </div>
            </Tooltip>
          </div>
          <div
            className={`flex gap-1 mb-1 ${
              dark ? "dialog-dark-subtitle" : "dialog-subtitle"
            }  font-medium text-sm`}
          >
            <PeopleIcon />
            <div>{TITLES.PEOPLE_ATTENDING}</div>
          </div>
        </DialogTitle>
        <div className={`dialog-content   ${dark ? "dark-dialog" : ""}`}>
          <div
            style={{
              maxHeight: "200px",
              minHeight: "200px",
              overflow: "scroll",
            }}
            onScroll={handleContentScroll}
            className={` overflow-scroll  flex flex-col px-4 mb-2 -mt-3`}
          >
            {dataJsx && <div>{dataJsx}</div>}
          </div>
        </div>
      </Dialog>
    </>
  );
}
