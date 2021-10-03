import React, { useEffect } from "react";
import BannerStyle from "../../styles/Banner.module.css";
import SignIn from "../Auth/SignIn";
import {
  LANDING_PAGE_HERO_KEYWORDS,
  LANDING_PAGE_HERO_MESSAGE_LIST,
} from "../../constants/constants";
import { randomKeyWord } from "../../utils/utility";

function Banner() {
  const [openSignInDialog, setOpenSignInDialog] = React.useState(false);
  const [bannerHeader, setBannerHeader] = React.useState(
    LANDING_PAGE_HERO_KEYWORDS[0]
  );
  const handleSignInDialogOpen = () => {
    setOpenSignInDialog(true);
  };

  const handleSignInDialogClose = () => {
    setOpenSignInDialog(false);
  };
  useEffect(() => {
    setInterval(() => {
      setBannerHeader(randomKeyWord(LANDING_PAGE_HERO_KEYWORDS));
    }, 60000);
  }, []);
  return (
    <div>
      <div className={BannerStyle.banner__contents}>
        <h1 className={BannerStyle.banner__title}>{bannerHeader}</h1>

        <div className={BannerStyle.banner__buttons}>
          <button
            onClick={(e) => handleSignInDialogOpen()}
            className={BannerStyle.banner__button}
          >
            Get Started
          </button>
          <a href="#popularlivesessions">
            <button className={BannerStyle.banner__button}>
              Live Sessions
            </button>
          </a>
        </div>
        <ul className={BannerStyle.banner__description}>
          {LANDING_PAGE_HERO_MESSAGE_LIST.map((msg, key) => (
            <li key={key}>
              {msg.icon}&nbsp;{msg.text}
            </li>
          ))}
        </ul>
      </div>
      <SignIn
        dialogCloseRequest={handleSignInDialogClose}
        isOpen={openSignInDialog}
      />
    </div>
  );
}

export default Banner;
