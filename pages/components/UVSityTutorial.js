import React from "react";
import ReactPlayer from "react-player/youtube";
import PlayerStyle from "../../styles/Player.module.css";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ShareIcon from "@material-ui/icons/Share";
import GroupIcon from "@material-ui/icons/Group";
import DraftsIcon from "@material-ui/icons/Drafts";
import InfoIcon from "@material-ui/icons/Info";
import DateRangeIcon from "@material-ui/icons/DateRange";
import FileCopyIcon from "@material-ui/icons/FileCopy";
const getIcon = (i, step) => {
  if (step === "step1") {
    switch (i) {
      case 0:
        return <LockOpenIcon />;
      case 1:
        return <AddBoxIcon />;
      case 2:
        return <CheckCircleOutlineIcon />;
      case 3:
        return <ShareIcon />;
      case 4:
        return <GroupIcon />;

      default:
        break;
    }
  } else if (step === "step2") {
    switch (i) {
      case 0:
        return <DraftsIcon />;
      case 1:
        return <LockOpenIcon />;
      case 2:
        return <ShareIcon />;
      default:
        break;
    }
  } else {
    switch (i) {
      case 0:
        return <InfoIcon />;
      case 1:
        return <DateRangeIcon />;
      case 2:
        return <FileCopyIcon />;
      default:
        break;
    }
  }
};
function UVSityTutorial({
  firstStep,
  secondStep,
  thirdStep,
  tutorialMessages,
  srcTutorialUrl,
  tutorialHeaderText,
  mascotIcon,
  tutorialFooterText,
}) {
  return (
    <div
      id="knowmore"
      className={`${PlayerStyle.tutorial__wrapper} ${
        firstStep && "bg-step-one"
      } ${secondStep && "bg-step-two"} 
      ${thirdStep && "bg-step-three"}  `}
    >
      <div>
        <h3 className={PlayerStyle.tutorial__header__text}>
          {tutorialHeaderText}
        </h3>
      </div>
      <section className={PlayerStyle.player__main}>
        <ReactPlayer
          controls
          className={PlayerStyle.react__player}
          url={srcTutorialUrl}
        />
        <div className="flex flex-col">
          <ul className={PlayerStyle.player__description}>
            {firstStep &&
              tutorialMessages?.map((msg, i) => (
                <li>
                  {getIcon(i, "step1")}
                  {msg}
                </li>
              ))}
            {secondStep &&
              tutorialMessages?.map((msg, i) => (
                <li>
                  {getIcon(i, "step2")}
                  {msg}
                </li>
              ))}
            {thirdStep &&
              tutorialMessages?.map((msg, i) => (
                <li>
                  {getIcon(i, "step3")}
                  {msg}
                </li>
              ))}
          </ul>
          <div className="">
            <img
              className="lg:w-80 sm:w-40 md:w-48 w-40 object-contain lg:ml-40  ml-12"
              src={mascotIcon}
            />
          </div>
        </div>
      </section>
      <div className="relative">
        <h4 className={PlayerStyle.player__description}>
          <ArrowUpwardIcon className={PlayerStyle.player__arrowIcon} />
          {tutorialFooterText}
        </h4>
      </div>
    </div>
  );
}

export default UVSityTutorial;
