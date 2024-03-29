import React, { useEffect, useState } from "react";
import BannerStyle from "../../styles/Banner.module.css";
import SignIn from "../Auth/SignIn";
import { LANDING_PAGE_HERO_MESSAGE_LIST } from "../../constants/constants";
import { getRandomArrayElement } from "../../utils/utility";

function Banner({
  bannerObject,
  signedInDialogOpened,
  setSignedInDialogClosed,
}) {
  const [openSignInDialog, setOpenSignInDialog] = useState(false);
  const initialBannerObject = bannerObject[0];
  const [bannerHeader, setBannerHeader] = useState(
    <>
      {initialBannerObject?.icon} {initialBannerObject?.phrase}
    </>
  );
  useEffect(() => {
    if (signedInDialogOpened) {
      setOpenSignInDialog(true);
    } else {
      setOpenSignInDialog(false);
    }
  }, [signedInDialogOpened]);

  const handleSignInDialogOpen = () => {
    setOpenSignInDialog(true);
  };

  const handleSignInDialogClose = () => {
    setOpenSignInDialog(false);
    if (setSignedInDialogClosed) setSignedInDialogClosed();
  };
  useEffect(() => {
    let controller = new AbortController();
    if (bannerObject) {
      window.bannerSwapperInterval = setInterval(() => {
        let object = getRandomArrayElement(bannerObject);
        setBannerHeader(
          <>
            {object?.icon} {object?.phrase}
          </>
        );
      }, 60000);
    }
    return () => {
      if (
        window.bannerSwapperInterval != undefined &&
        window.bannerSwapperInterval != "undefined"
      ) {
        window.clearInterval(window.bannerSwapperInterval);
      }
      controller?.abort();
    };
  }, [bannerObject]);
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
          <a href="#discover-popular-live-sessions">
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
