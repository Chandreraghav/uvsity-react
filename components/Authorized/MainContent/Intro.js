import React, { useState, useEffect } from "react";
import IntroStyles from "../../../styles/authorized.intro.module.css";
import { useDataLayerContextValue } from "../../../context/DataLayer";
import { AuthGuardService } from "../../../auth-guard/service/AuthGuardService";
import {
  GREETING,
  GREET_IMAGES,
  INTRO_ACTIONS,
  INTRO_BACKGROUND_GRADIENT,
  INTRO_TEXT_KEYWORDS,
} from "../../../constants/userdata";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Tooltip } from "@mui/material";
import { getRandomArrayElement } from "../../../utils/utility";
import { TIME_OF_DAY_GREETING } from "../../../constants/constants";
function Intro() {
  const [USERDATA, dispatch] = useDataLayerContextValue();
  const [loggedIn, setLoggedIn] = useState(false);
  const [introMoodColor, setIntroMoodColor] = useState(null);
  const introObject = INTRO_TEXT_KEYWORDS[0];
  const greetObject = GREET_IMAGES[0]
  const [greetImage, setGreetImage]=useState(greetObject)
  const [introHeader, setIntroHeader] = useState(
    <>
      {introObject?.icon} {introObject?.phrase}
    </>
  );
  useEffect(() => {
    setLoggedIn(AuthGuardService.isUserLoggedIn());
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
      setInterval(() => {
        let object = getRandomArrayElement(INTRO_TEXT_KEYWORDS)
        setIntroHeader(<>{object?.icon} {object?.phrase}</>);
      }, 60000);
    }

    if (GREET_IMAGES) {
      setInterval(() => {
        setGreetImage(getRandomArrayElement(GREET_IMAGES));
      }, 60000);
    }
    return () => {
      controller?.abort();
    };
  }, []);
  if (!loggedIn) {
    return "";
  }
  return (
    <div className={` px-1 py-1 ${IntroStyles.intro}`}>
      <h2 className={` text-left ${introMoodColor}`}>
        {GREETING.replace("<user>", USERDATA?.SUMMARY?.data?.firstName)}
      </h2>
      <header
        className={IntroStyles.intro__banner}
        style={{
         // backgroundImage: `url(${INTRO_BACKGROUND_GRADIENT})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className={IntroStyles.intro__contents}>
        <div>
          <img className={`block  items-center w-48 mx-auto object-contain`} 
          src={`../${greetImage}`}/>
         
          </div>
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
                    <Button variant="contained" startIcon={action.icon}>
                      {action.title}
                    </Button>
                  </Tooltip>
                )
              )}
             
            </Stack>
          </div>
        </div>
         <div className={IntroStyles.intro__Fade__Bottom}></div>
      </header>
    </div>
  );
}

export default Intro;
