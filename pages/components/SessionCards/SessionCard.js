import * as React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SessionStyle from "../../../styles/Session.module.css";
import { avatarToString, localTZDate } from "../../../utils/utility";
import EventIcon from "@material-ui/icons/Event";
import SchoolIcon from "@material-ui/icons/School";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarRateIcon from "@material-ui/icons/StarRate";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Divider from "@material-ui/core/Divider";
import { SESSION_REVIEW_MAX_STAR_COUNT } from "../../../constants/constants";
import CornerRibbon from "react-corner-ribbon";
export default function SessionCard({ data }) {
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
        <MonetizationOnIcon className={`${SessionStyle.session__card__monetization__currency__icon}`} />
        <span className={`${SessionStyle.session__card__currency__amount}`}>{amount}</span>
      </div>
    );
  };
  return (
    
    <Card
      className={` ${SessionStyle.session__card} ${SessionStyle.session__card__lightblue__variant} 
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
        <Typography
          className={` ${SessionStyle.session__card__title} sm:line-clamp-1 lg:line-clamp-1 line-clamp-1 font-medium text-xs `}
          gutterBottom
          variant="h5"
          component="div"
        >
          {data?.courseFullName}
        </Typography>
        <Divider
          variant="inset"
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
              <span className="lg:text-lg md:text-md sm:text-xs text-xs text-gray-400 font-bold line-clamp-1">
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
                <span className={SessionStyle.session__card__attendance__count}>
                  {data?.numberOfAttendees}
                </span>
                <span className={SessionStyle.session__card__attendance__text}>
                  attending
                </span>
              </div>
            )}
          {data?.numberOfAttendees &&
            (data?.numberOfAttendees <= 0 ||
              isNaN(data?.numberOfAttendees)) && (
              <div className="flex flex-row space-x-1">
                <span
                  className={`${SessionStyle.session__card__attendance__text} font-normal`}
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
