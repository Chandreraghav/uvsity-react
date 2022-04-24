import React from "react";

function MiniFooter(props) {
  return (
    <div
      className={`${props?.showOnSmallScreens ? "lg:hidden xl:hidden sm: flex-1 md:hidden" : ""}`}
    >
      
      <div className="px-2 py-2  uvsity__card uvsity__card__border__theme bg-transparent">
        <div className="flex justify-center flex-wrap gap-2">
          <a
            className={`text-xs  text-gray-600  app__anchor__footer`}
            href="/browse/subtitles"
          >
            User Agreement
          </a>

          <a
            className={`text-xs  text-gray-600 app__anchor__footer`}
            href="/browse/subtitles"
          >
            Privacy Policy
          </a>

          <a
            className={` text-xs text-gray-600  app__anchor__footer`}
            href="/browse/subtitles"
          >
            Help Center
          </a>
          <a
            className={`text-xs text-gray-600  app__anchor__footer`}
            href="/browse/subtitles"
          >
            Contact us
          </a>
        </div>
        <div>
          <div className="flex gap-1 justify-center">
            <img
              className=" object-contain w-12 h-12"
              src={process.env.NEXT_PUBLIC_APP_LOGO_IMAGE}
              alt="uvsity-Logo"
            />
            <div className=" text-xs mt-2 py-2">
              {process.env.NEXT_PUBLIC_APP_FOOTER_TEXT}
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default MiniFooter;
