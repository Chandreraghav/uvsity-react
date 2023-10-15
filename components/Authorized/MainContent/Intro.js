import React, { useState, useEffect, useMemo } from "react";
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
import IntroShimmer from "./Shimmer/IntroShimmer";
import { useDataLayerContextValue } from "../../../context/DataLayer";

function Intro(props) {
  const [ctxUserdata, dispatch] = useDataLayerContextValue();
  const router = useRouter();
  const [introHeader, setIntroHeader]=useState(null)
  
 const introMoodColor= useMemo(() => {
    if (GREETING) {
      if (GREETING.includes(TIME_OF_DAY_GREETING.MORNING)) {
        return("morning");
      } else if (GREETING.includes(TIME_OF_DAY_GREETING.AFTERNOON)) {
        return("afternoon");
      } else {
        return("evening");
      }
    }
  }, []);
  // Define an array of keyword options
  const keywords = useMemo(() => INTRO_TEXT_KEYWORDS, []);
  
  useEffect(() => {
    // Function to update random text
    const updateRandomText = () => {
      let object = getRandomArrayElement(INTRO_TEXT_KEYWORDS);
      setIntroHeader(<>
      {object.icon} {object.phrase}
      </>)
       
    };

    // Initial call to set the random text
    updateRandomText();

    // Set up an interval to change the text every 1 minutes (60000 milliseconds)
    const intervalId = setInterval(updateRandomText, 60000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [keywords]);
  

  const userdata = useMemo(() => {
    return ctxUserdata?.userdata || null
  }, [ctxUserdata?.userdata])

  const invokeIntroAction = (code) => {
    if (code === WORKFLOW_CODES.USER.INTRO_PATHS.SESSION) {
      router.push({
        pathname: AUTHORIZED_ROUTES.AUTHORIZED.SESSION.CREATE,
        query: { token: uuidv4() },
      });
    }
  };
  return (

    <div
      className={` mt-2 px-1 py-1 rounded-2xl border-b-4  border-b-blue-800  `}
    >
      {!userdata && (<IntroShimmer visible={true} />)}
      {userdata && userdata.firstName && (
        <div
          className={`flex flex-row items-center h-10 overflow-auto ${introMoodColor}`}
        >
          <p
            className=" text-lg  place-content-center font-semibold  
               leading-none xl:block text-gray-700 dark:text-gray-800"
          >
            👋 {GREETING.replace("<user>", userdata?.firstName)}
          </p>


        </div>
      )}
      <Spacer />

      <header
        className={IntroStyles.intro__banner}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          display: "block"
        }}
      >
        <div className={IntroStyles.intro__contents}>
          <div className={IntroStyles.intro__title}>
            <h3 className="text-left px-2 text-gray-900 dark:text-gray-100">
              {introHeader}
            </h3>
          </div>

          <div className={IntroStyles.intro__buttons}>
            <Stack direction="row" spacing={2}>
              {INTRO_ACTIONS.filter((action) => !action.hidden).map((action) =>
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
