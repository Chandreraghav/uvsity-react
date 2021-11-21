import { Tooltip } from "@mui/material";
import React from "react";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarRateIcon from "@mui/icons-material/StarRate";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { SESSION_REVIEW_MAX_STAR_COUNT } from "../../../../constants/constants";
import { PLACEHOLDERS, TOOLTIPS } from "../../../../constants/userdata";
import SessionStyle from "../../../../styles/Session.module.css";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Profile from "../../Network/People/Dashboard/Profile";
import Spacer from "../../../shared/Spacer";

function Preview({ data, authorized }) {
  if (!authorized || !data) return "";
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
        <Tooltip title={TOOLTIPS.FREE_SESSION}>
          <div className={`${SessionStyle.session__card__costing}`}>
            {PLACEHOLDERS.FREE}
          </div>
        </Tooltip>
      );
    }
    return (
      <Tooltip title={TOOLTIPS.PAID_SESSION}>
        <div
          className={`${SessionStyle.session__card__costing} ${SessionStyle.session__card__currency__amount}`}
        >
          <MonetizationOnIcon />
          <span className={`${SessionStyle.session__card__currency__amount}`}>
            {amount}
          </span>
        </div>
      </Tooltip>
    );
  };
  return (
    <div className=" uvsity__card__border__theme bg-white w-full dark:bg-brand-dark-grey-800 dark:border-brand-grey-800 rounded-bl-lg rounded-br-lg md:px-2">
      {/* EVENT/SESSION/AUTHOR NAME */}
      <div className="flex flex-row flex-wrap flex-grow-0">
        <div className="flex-auto w-full pr-0 xl:w-auto xl:flex-1 xl:pr-5">
          <Tooltip title={data?.courseFullName}>
            <h1
              className={`${SessionStyle.preview__session__title} line-clamp-2 mb-1 text-3xl font-semibold leading-tight tracking-tight text-brand-black dark:text-brand-grey-100`}
            >
              {data?.courseFullName}
            </h1>
          </Tooltip>
          <Spacer/>

          <Profile
            firstName={data.creator.firstName}
            lastName={data.creator.lastName}
            avatar={data.courseCreatorImageURL}
            sessionStartDTime={data.courseStartDTime}
            userType={data.creator.userType}
            instituition={data.creator.educationalInstitute}
            isVisibleOnSessionCard
          />
        </div>

        {/* EVENT POSTER */}
        <div className="w-full h-auto pt-2 xl:w-56">
          <img
            className="block w-full overflow-hidden object-contain bg-gray-100 bg-center bg-cover rounded post-cover dark:bg-brand-grey-800 dark:border-brand-grey-800"
            src={data?.imageURL}
            alt={data?.courseFullName}
          />
        </div>
      </div>
      <Spacer/>

      {/* MORE DETAIL */}

      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex gap-0">
            {getSessionRatingDesignLayout(data?.avgReviewIntValue)}
          </div>
          {data?.numberOfAttendees > 0 && (
            <div className="flex flex-row">
              <span className={SessionStyle.session__card__attendance__count}>
                {data?.numberOfAttendees}
              </span>
              <span
                className={`${SessionStyle.session__card__attendance__text}`}
              >
                {PLACEHOLDERS.ATTENDING}
              </span>
            </div>
          )}
        </div>
        <Spacer/>
        <div>
          <Divider className={SessionStyle.preview__card__divider} />
        </div>
      </div>

      <CardActions className="justify-between">
        {generateMonetizationAmountOnCard(data.cost)}
        <Tooltip title={TOOLTIPS.KNOW_MORE_SESSION}>
          <Button endIcon={<ArrowForwardIcon />} variant="outlined">
            {PLACEHOLDERS.VIEW_DETAIL}
          </Button>
        </Tooltip>
      </CardActions>
    </div>
  );
}

export default Preview;
