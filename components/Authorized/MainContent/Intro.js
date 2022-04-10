import React, { useState, useEffect } from "react";
import IntroStyles from "../../../styles/authorized.intro.module.css";
import {
  GREETING,
  INTRO_ACTIONS,
  INTRO_TEXT_KEYWORDS,
} from "../../../constants/userdata";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Tooltip } from "@mui/material";
import { getRandomArrayElement } from "../../../utils/utility";
import { TIME_OF_DAY_GREETING } from "../../../constants/constants";
import Spacer from "../../shared/Spacer";
import { WORKFLOW_CODES } from "../../../constants/workflow-codes";
import { useRouter } from "next/router";
import { AUTHORIZED_ROUTES } from "../../../constants/routes";
import { v4 as uuidv4 } from "uuid";
import Shimmer from "./Shimmer/Shimmer";
import IntroShimmer from "./Shimmer/IntroShimmer";

function Intro(props) {
  const userdata = props.data;
  const router = useRouter();
  const [introMoodColor, setIntroMoodColor] = useState(null);
  const introObject = INTRO_TEXT_KEYWORDS[0];
  const [introHeader, setIntroHeader] = useState(
    <>
      {introObject?.icon} {introObject?.phrase}
    </>
  );
  useEffect(() => {
    
    if (GREETING) {
      if (GREETING.includes(TIME_OF_DAY_GREETING.MORNING)) {
        setIntroMoodColor("morning");
      } else if (GREETING.includes(TIME_OF_DAY_GREETING.AFTERNOON)) {
        setIntroMoodColor("afternoon");
      } else {
        setIntroMoodColor("evening");
      }
    }
  }, []);
  useEffect(() => {
    let controller = new AbortController();
    if (INTRO_TEXT_KEYWORDS) {
    window.introTextSwapperInterval= setInterval(() => {
        let object = getRandomArrayElement(INTRO_TEXT_KEYWORDS);
        setIntroHeader(
          <>
            {object?.icon} {object?.phrase}
          </>
        );
      }, 60000);
    }

    return () => {
      controller?.abort();
    };
  }, []);
  

  const invokeIntroAction = (code) => {
    if (code === WORKFLOW_CODES.USER.INTRO_PATHS.SESSION) {
      
      router.push({
        pathname: AUTHORIZED_ROUTES.AUTHORIZED.SESSION.CREATE,
        query: { token: uuidv4() },
      });
    }
  };
  return (
    <div className={` mt-2 px-1 py-1 `}>
      <div
        className={`flex flex-row items-center justify-between h-10 flex-1 overflow-auto ${introMoodColor}`}
      >
        {userdata.isLoading && (
          <div className="px-2">
            <Shimmer visible />
          </div>
        )}
        {userdata.isSuccess && (
          <p
            className=" text-lg font-semibold  
              leading-none xl:block dark:text-brand-grey-200"
          >
            👋 {GREETING.replace("<user>", userdata.data?.firstName)}
          </p>
        )}
      </div>

      <Spacer />
      {userdata.isLoading && (
        <div className="px-2">
          <IntroShimmer visible />
        </div>
      )}
      <header
        className={IntroStyles.intro__banner}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          display: userdata.isLoading ? "none" : "block",
        }}
      >
        <div className={IntroStyles.intro__contents}>
          <div className={IntroStyles.intro__title}>
            <h3 className="text-left px-2 text-black">{introHeader}</h3>
          </div>

          <div className={IntroStyles.intro__buttons}>
            <Stack direction="row" spacing={2}>
              {INTRO_ACTIONS.map((action) =>
                action.disabled ? (
                  <Button
                    key={action.id}
                    disabled
                    variant="contained"
                    endIcon={action.icon}
                  >
                    {action.title}
                  </Button>
                ) : (
                  <Tooltip key={action.id} title={action.tooltip}>
                    <Button
                      onClick={(e) => invokeIntroAction(action.code)}
                      variant="contained"
                      startIcon={action.icon}
                    >
                      {action.title}
                    </Button>
                  </Tooltip>
                )
              )}
            </Stack>
          </div>
        </div>
      </header>
      <Spacer />
    </div>
  );
}

export default Intro;
