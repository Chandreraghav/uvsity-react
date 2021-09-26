import React from "react";
import ReactPlayer from "react-player/youtube";
import PlayerStyle from "../../styles/Player.module.css";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
function UVSityTutorial() {
  return (
    <section id="knowmore" className={PlayerStyle.player__main}>
      <div className={PlayerStyle.player__wrapper}>
        <ReactPlayer
          controls
          className={PlayerStyle.react__player}
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
        />

        <img
          className="lg:w-60 sm:w-44 md:w-48 w-36 object-contain float-right"
          src="/static/images/how_it_works_mascot.png"
        />

        <h4 className={PlayerStyle.player__description}>
          <ArrowUpwardIcon className={PlayerStyle.player__arrowIcon} />
          Play the video to know more...
        </h4>
      </div>
    </section>
  );
}

export default UVSityTutorial;
