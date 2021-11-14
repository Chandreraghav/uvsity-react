import React, { useState, useEffect } from "react";
import IntroStyles from "../../../styles/authorized.intro.module.css";
import { useDataLayerContextValue } from "../../../context/DataLayer";
import { AuthGuardService } from "../../../auth-guard/service/AuthGuardService";
import {
  GREETING,
  INTRO_ACTIONS,
  INTRO_BACKGROUND_GRADIENT,
  INTRO_TEXT_KEYWORDS,
} from "../../../constants/userdata";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Tooltip } from "@mui/material";
import { randomKeyWord } from "../../../utils/utility";
import { TIME_OF_DAY_GREETING } from "../../../constants/constants";
function Intro() {
  const [USERDATA, dispatch] = useDataLayerContextValue();
  const [loggedIn, setLoggedIn] = useState(false);
  const [introMoodColor, setIntroMoodColor] = useState(null);
  const [introHeader, setIntroHeader] = useState(INTRO_TEXT_KEYWORDS[0]);
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
    setInterval(() => {
      setIntroHeader(randomKeyWord(INTRO_TEXT_KEYWORDS));
    }, 60000);
    return () => {
      controller?.abort();
    };
  }, []);
  if (!loggedIn) {
    return "";
  }
  return (
    <div className={IntroStyles.intro}>
      <h2 className={introMoodColor}>
        {GREETING.replace("<user>", USERDATA?.SUMMARY?.data?.firstName)}
      </h2>
      <header
        className={IntroStyles.intro__banner}
        style={{
          backgroundImage: `url(${INTRO_BACKGROUND_GRADIENT})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          marginLeft: "1%",
        }}
      >
        <div className={IntroStyles.intro__contents}>
          <div className={IntroStyles.intro__title}>
            <h3>{introHeader}</h3>
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
                  <Tooltip  key={action.id} title={action.tooltip}>
                    <Button
                     
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

        <div className={IntroStyles.intro__Fade__Bottom}></div>
      </header>
    </div>
  );
}

export default Intro;
