import * as React from "react";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Slide } from "@mui/material/Slide";
import { DialogTitle, Tooltip } from "@mui/material";
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
  TITLES,
  TOOLTIPS,
  ME,
} from "../../../constants/userdata";
import UserDataService from "../../../pages/api/users/data/UserDataService";
import { useQuery } from "react-query";
import { KEYS } from "../../../async/queries/keys/unique-keys";
import { standardStaleTime } from "../../../async/subscriptions";
import { navigateToProfile, navigateToSessionProfile } from "../../Authorized/Shared/Navigator";
import { useRouter } from "next/router";
import { COLOR_CODES } from "../../../constants/constants";
import Profile from "../../Authorized/Network/People/Dashboard/Profile";
import { THEME_MODES, useTheme } from "../../../theme/ThemeProvider";
import { useDataLayerContextValue } from "../../../context/DataLayer";
toast.configure();

export default function Session_Attendees_ListDialog({
  isOpen,
  dialogCloseRequest,
  data
}) {
  const [context, dispatch] = useDataLayerContextValue();
  const [userdata, setUserData] = useState(context?.logged_in_info);
  const [_theme, _dispatch] = useTheme();
  const [isDark, setDark] = useState(_theme.mode === THEME_MODES.DARK);
  const [isSticky, setSticky] = useState(false);
  const [attendees, setAttendees] = useState([])
  const [titleJsx, setTitleJsx] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setDark(_theme.mode === THEME_MODES.DARK);
  }, [_theme])

  const fetchAttendeesPerCourse = async () => {
    return (await UserDataService.getAttendeesPerCourse(data?.courseId)).data
  }
  const ATTENDEES = useQuery([KEYS.SESSION.ATTENDEES.PER_COURSE + "_" + data?.courseId], fetchAttendeesPerCourse, {
    staleTime: standardStaleTime,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    const _attendes = ATTENDEES.data?.users
    if (_attendes && _attendes instanceof Array) {
      _attendes.forEach((user, _idx) => {
        user.invitationAction = {
          invitationAction: user.connectionStatus,
        }
      });
      setAttendees(_attendes)
    }

    return (() => setAttendees([]))

  }, [ATTENDEES.data?.users])

  useEffect(() => {
    populateDialogTitle();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  if (!data || isOpen === undefined) {
    return <></>;
  }
  const handleContentScroll = (o) => {
  };
  const isItMe = () => {
    const user_id = data?.userDetailsId || data?.creator?.userDetailsId;
    return user_id === userdata?.userDetailsId;
  };

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
  const goToSession = () => {
    const session_id = data?.courseId;
    navigateToSessionProfile(Number(session_id), router)
  };

  const populateDialogTitle = () => {
    let jsx = [];
    if (data) {
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
            backgroundColor: isDark ? "#111" : "#fff",
            color: isDark ? "#fff" : "#111",
          }}
        >
          <div className={`flex justify-between `}>
            <div className={`  leading-tight  text-left font-bold flex-col`}>
              <Typography
                className={`dialog-title line-clamp-1`}
                gutterBottom
                variant="h6"
                component="div"
              >

                <Tooltip
                  title={data?.courseFullName}
                >
                  <div onClick={goToSession} >{data?.courseFullName}</div>
                </Tooltip>

              </Typography>
              {titleJsx && <div>{titleJsx}
              </div>}
            </div>

            <div className="ml-auto">
              <Tooltip title="close">
                <div>
                  {handleClose ? (
                    <IconButton
                      aria-label="close"
                      onClick={handleClose}
                      sx={{ color: `${isDark ? COLOR_CODES.GRAY.DEEP : ""}` }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  ) : null}
                </div>
              </Tooltip>
            </div>
          </div>
          <div
            className={`flex gap-1 mb-1 ${isDark ? "dialog-dark-subtitle" : "dialog-subtitle"
              }  font-medium text-sm`}
          >
            <PeopleIcon />
            <div>{TITLES.PEOPLE_ATTENDING}</div>
          </div>
        </DialogTitle>
        <div className={`dialog-content   ${isDark ? "dark-dialog" : ""}`}>
          <div
            style={{
              maxHeight: "200px",
              minHeight: "200px",
              overflow: "scroll",
            }}
            onScroll={handleContentScroll}
            className={` overflow-scroll  flex flex-col px-4 mb-2 -mt-3`}
          >

            {attendees && attendees.length > 0 && attendees.map((user, _idx) => (<div key={_idx}>
              <Profile
                oid={user.userDetailsId}
                options={{ connect: false, mixedMode: true }}
                firstName={user.firstName}
                lastName={user.lastName}
                avatar={user.profilePicName}
                userType={user.userType}
                instituition={user.educationalInstitute}
                metaData={user}
                origin={'ad'}
                userdata={userdata}
                dark={isDark}
              />

            </div>))}
          </div>
        </div>
      </Dialog>
    </>
  );
}
