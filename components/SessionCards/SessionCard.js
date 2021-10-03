import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import SessionStyle from "../../styles/Session.module.css";
import { avatarToString, localTZDate } from "../../utils/utility";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarRateIcon from "@mui/icons-material/StarRate";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Divider from "@mui/material/Divider";
import Shimmer from "./Shimmer"
import {
  SESSION_REVIEW_MAX_STAR_COUNT,
  SHIM_MAX_TIMEOUT_IN_MILLIS,
} from "../../constants/constants";
import CornerRibbon from "react-corner-ribbon";

export default function SessionCard({ data, shimmerTime }) {
  const [shimTimeOut, setShimTimeOut] = useState(SHIM_MAX_TIMEOUT_IN_MILLIS);
  const [showOriginalContent, setShowOriginalContent] = useState(false);
  useEffect(() => {
    let _shimmerTime = shimmerTime || shimTimeOut
    setTimeout(() => {
      setShowOriginalContent(true);
    }, _shimmerTime);
  }, []);
  const getSessionRatingDesignLayout = (reviewCount) => {
    if (
      !reviewCount ||
      reviewCount == 0 ||
      isNaN(reviewCount) ||
      reviewCount > 5
    ) {
      return (
        <img
          className={SessionStyle.session__card__review__star__replacement}
          src={process.env.NEXT_PUBLIC_APP_LOGO_IMAGE_SHORTHAND}
        />
      );
    }
    let design = [];
    let _rc = reviewCount;
    for (var j = 0; j < SESSION_REVIEW_MAX_STAR_COUNT; j++) {
      if (_rc <= 0)
        design.push(
          <StarBorderIcon
            className={SessionStyle.session__card__review__unstar}
          />
        );
      else
        design.push(
          <StarRateIcon className={SessionStyle.session__card__review__star} />
        );
      _rc--;
    }
    return design;
  };
  const generateMonetizationAmountOnCard = (amount) => {
    if (!amount || amount == 0 || isNaN(amount)) {
      return (
        <div className={`${SessionStyle.session__card__costing}`}>Free</div>
      );
    }
    return (
      <div
        className={`${SessionStyle.session__card__costing} ${SessionStyle.session__card__currency__amount}`}
      >
        <MonetizationOnIcon />
        <span className={`${SessionStyle.session__card__currency__amount}`}>
          {amount}
        </span>
      </div>
    );
  };
  if(!showOriginalContent){
    return( <div className={`${SessionStyle.session__card__shimmering__behavior}`}><Shimmer visible={!showOriginalContent}/></div>)
  }
  return (
      <Card
        className={`${SessionStyle.session__card} ${SessionStyle.session__card__lightblue__variant} 
      mt-5 mb-5 ml-5 mr-5  max-w-lg
    shadow-3xl antialiased`}
      >
        <CornerRibbon
          position="bottom-right" // OPTIONAL, default as "top-right"
          fontColor="#f0f0f0" // OPTIONAL, default as "#f0f0f0"
          backgroundColor="#2c7" // OPTIONAL, default as "#2c7"
          containerStyle={{}} // OPTIONAL, style of the ribbon
          style={{}} // OPTIONAL, style of ribbon content
          className="" // OPTIONAL, css class of ribbon
        >
          New
        </CornerRibbon>

        <CardMedia
          component="img"
          image={data?.imageURL}
          alt={data?.courseFullName}
        />

        <CardContent>
          {/* session title */}

          <div className={` line-clamp-1 ${SessionStyle.session__card__title}`}>
            {data?.courseFullName}
          </div>

          <Divider
            variant="fullwidth"
            textAlignLeft
            className={SessionStyle.session__card__divider}
            component="div"
          />
          <div className="flex flex-row py-2">
            <div>
              {/* avatar */}
              {data?.courseCreatorImageURL !== "" && (
                <Avatar
                  alt={`${data.creator.firstName} ${data.creator.lastName}`}
                  src={data.courseCreatorImageURL}
                />
              )}
              {(data?.courseCreatorImageURL === "" ||
                data?.courseCreatorImageURL == null) && (
                <Avatar
                  {...avatarToString(
                    `${data.creator.firstName} ${data.creator.lastName}`
                  )}
                />
              )}
            </div>
            <div className="flex flex-col -mt-2">
              {/* author name */}
              <div className="ml-2">
                <span className={`lg:text-lg md:text-md sm:text-xs text-xs font-bold line-clamp-1 text-gray-400`}>
                  {data.creator.firstName} {data.creator.lastName}
                </span>
              </div>
              {/* profile info */}
              <div className="mb-2">
                <span
                  className={`line-clamp-1  ${SessionStyle.session__card__profile__subtitle}`}
                >
                  <SchoolIcon
                    className={SessionStyle.session__card__profile__icon}
                  />
                  {data.creator.userType},{data.creator.educationalInstitute}
                </span>
              </div>
              {/* starts on */}
              <div className="mb-2">
                <span
                  className={`sm:line-clamp-1  ${SessionStyle.session__card__event__time__subtitle}`}
                >
                  <EventIcon
                    className={SessionStyle.session__card__event__icon}
                  />
                  {localTZDate(data.courseStartDTime)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            {/* Reviews */}

            <div className="flex">
              {getSessionRatingDesignLayout(data?.avgReviewIntValue)}
            </div>
            {/* Attending count */}

            {data?.numberOfAttendees &&
              data?.numberOfAttendees > 0 &&
              !isNaN(data?.numberOfAttendees) && (
                <div className="flex flex-row space-x-1">
                  <span
                    className={SessionStyle.session__card__attendance__count}
                  >
                    {data?.numberOfAttendees}
                  </span>
                  <span
                    className={`${SessionStyle.session__card__attendance__text} line-clamp-1`}
                  >
                    attending
                  </span>
                </div>
              )}
            {data?.numberOfAttendees &&
              (data?.numberOfAttendees <= 0 ||
                isNaN(data?.numberOfAttendees)) && (
                <div className="flex flex-row space-x-1">
                  <span
                    className={`${SessionStyle.session__card__attendance__text} font-normal  line-clamp-1`}
                  >
                    ..be the first to attend
                  </span>
                </div>
              )}
          </div>

          {/* Tags */}
        </CardContent>
        <Divider
          variant="inset"
          textAlignLeft
          className={SessionStyle.session__card__divider}
          component="div"
        />
        <CardActions>{generateMonetizationAmountOnCard(data.cost)}</CardActions>
      </Card>
  );
}
