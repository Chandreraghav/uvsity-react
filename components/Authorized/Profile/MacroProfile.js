import { Avatar, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  DEFAULT_COVER_IMAGE,
  IMAGE_PATHS,
  ME,
  NETWORK,
  TITLES,
} from "../../../constants/userdata";
import ProfileStyle from "../../../styles/Profile.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AddTaskIcon from "@mui/icons-material/AddTask";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {
  avatarToString,
  formattedName,
  formattedProfileSubtitle,
  _delay,
} from "../../../utils/utility";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import SendIcon from "@mui/icons-material/Send";
import StarRateIcon from "@mui/icons-material/StarRate";

function MacroProfile(props) {
  console.log(props);
  const [show, setShow] = useState(false);
  useEffect(() => {
    _delay(1000).then(() => {
      setShow(true);
    });
    return () => {
      setShow(false);
    };
  }, []);
  const isItMe = props?.data?.owner;
  const isConnected =
    isItMe === false &&
    props?.data?.userdata?.invitationAction ===
      NETWORK.CONNECTION_RELATION_STATE_ALT.IN_MY_NETWORK;
  const isPending =
    isItMe === false &&
    props?.data?.userdata?.invitationAction ===
      NETWORK.CONNECTION_RELATION_STATE_ALT.AWAITING_RESPONSE;
  const canSendOutgoingConnectionInvite =
    isItMe === false &&
    props?.data?.userdata?.invitationAction ===
      NETWORK.CONNECTION_RELATION_STATE_ALT.CONNECT;
  const canAcceptIncomingConnectionInvite =
    isItMe === false &&
    props?.data?.userdata?.invitationAction ===
      NETWORK.CONNECTION_RELATION_STATE_ALT.ACCEPT_REQUEST;

  const userdata = props?.data?.userdata;
  const firstName = userdata?.firstName;
  const profileImage = userdata?.profilepicName;
  const profileName = formattedName(userdata?.firstName, userdata?.lastName);
  const userType = userdata?.userType;
  const starRating = Number(userdata?.noOfRatingStars);
  const hasRatings = starRating > 0;
  const metaData = {
    eduIns: userdata?.eduIns,
    location: userdata?.city,
    city: userdata?.city,
    country: userdata?.country,
    social_profiles: [
      {
        in: {
          url: userdata?.linkedInProfile,
          tooltip: "Linkedin profile",
          icon: <LinkedInIcon />,
        },
      },
    ],
  };

  const profileSecondaryLine = formattedProfileSubtitle(
    userType,
    metaData.eduIns
  );

  const profileTertiaryLine = formattedProfileSubtitle(
    metaData?.city,
    metaData?.country
  );
  const generateStarRatings = () => {
    const ratings = [];
    for (var i = 0; i < starRating; i++) {
      ratings.push(
        <StarRateIcon className={` mt-1 ${ProfileStyle.profile__macro__review__star}`} />
      );
    }
    return <>{ratings}</>;
  };
  return (
    <>
      {!show ? (
        <>Shimmers</>
      ) : (
        <>
          {/* SECTION 1 Profile Name, Image, Cover Picture and Secondary Information */}
          <div
            className={`Profile-Name-Image-Cover-Picture-Secondary-Information-Connection-Status-social-profile-reference-Star-Rating uvsity__card  uvsity__card__border__theme ${ProfileStyle.profile__macro}`}
          >
            <img
              className=" h-28 lg:h-52 xl:h-52 md:h-48"
              src={DEFAULT_COVER_IMAGE}
              alt="profile-cover-image"
            />

            {profileImage &&
            !profileImage.includes(IMAGE_PATHS.NO_PROFILE_PICTURE) ? (
              <Avatar
                className={` cursor-pointer  ml-3 opacity-100 ${ProfileStyle.profile__macro__avatar}`}
                src={profileImage}
              />
            ) : (
              <Avatar
                className={`  ml-3 opacity-100 ${ProfileStyle.profile__macro__avatar}`}
                {...avatarToString(`${profileName}`)}
              />
            )}

            <div className={`ml-3 ${ProfileStyle.profile__macro__information}`}>
              <div className="flex">
                <div className="flex gap-1">
                  <Typography
                    className={ProfileStyle.profile__macro__profile__name}
                    variant="h5"
                    gutterBottom
                  >
                    {profileName} {isItMe ? ME : <></>}
                  </Typography>
                  {hasRatings && <>{generateStarRatings()}</>}
                </div>

                <div className="mr-2 ml-auto flex gap-1">
                  <div className=" connection-status">
                    {isPending && (
                      <>
                        <div
                          className={`flex cursor-pointer non-actionable  slow-transition`}
                        >
                          <IconButton
                            title={`${
                              TITLES.CONNECTION_REQUEST_PENDING + firstName
                            }`}
                            className=" cursor-pointer inline-flex "
                            fontSize="small"
                            sx={{ color: "#EF107D" }}
                            aria-label="awaiting-connection-response-from-person"
                          >
                            <PendingIcon fontSize="small" />
                            <small className={`text-sm font-small`}>
                              {NETWORK.CONNECTION_ACTION_STATUS.PENDING}
                            </small>
                          </IconButton>
                        </div>
                      </>
                    )}

                    {isConnected && (
                      <div
                        className={`flex non-actionable cursor-pointer  slow-transition`}
                      >
                        <IconButton
                          title={`${TITLES.CONNECTED_PEOPLE_LATENT.replace(
                            "#X#",
                            firstName
                          )}`}
                          className=" cursor-pointer inline-flex text-green-700 "
                          fontSize="small"
                          sx={{ color: "green!important" }}
                          aria-label="connected-to-person"
                        >
                          <CheckCircleIcon fontSize="small" />
                          <small className={`text-sm font-small`}>
                            {NETWORK.CONNECTION_ACTION_STATUS.CONNECTED}
                          </small>
                        </IconButton>
                      </div>
                    )}
                  </div>
                  {metaData?.social_profiles && (
                    <>
                      <div className="social-handles ml-auto">
                        {metaData?.social_profiles?.map((profile, index) => (
                          <>
                            <div className="mt-1" key={index}>
                              <a
                                href={profile.in.url}
                                target="_blank"
                                title={profile.in.tooltip}
                              >
                                {profile.in.icon}
                              </a>
                            </div>
                          </>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div
                className={`mb-2 -mt-2.5 ${ProfileStyle.profile__macro__secondary__information}`}
              >
                {profileSecondaryLine && (
                  <div className="flex gap-1">
                    <div className=" text-gray-600 font-semibold">
                      <Typography
                        variant="h5"
                        gutterBottom
                        className="text-sm leading-loose line-clamp-1"
                      >
                        <WorkIcon /> {profileSecondaryLine}
                      </Typography>
                    </div>
                  </div>
                )}
                {profileTertiaryLine && (
                  <>
                    <div className="flex gap-1">
                      <div className="text-gray-500 font-light">
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={`text-xs leading-loose line-clamp-1"
                `}
                        >
                          <LocationOnIcon fontSize="small" />
                          {profileTertiaryLine}
                        </Typography>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MacroProfile;
