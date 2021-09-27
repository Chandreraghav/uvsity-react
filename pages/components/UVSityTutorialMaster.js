import React from "react";
import { TUTORIAL_MESSAGES } from "../../constants/constants";
import UVSityTutorial from "./UVSityTutorial";

function UVSityTutorialMaster() {
  return (
    <div>
      <UVSityTutorial
        firstStep
        tutorialMessages={TUTORIAL_MESSAGES.SETUP_SESSION[0].messages}
        srcTutorialUrl={TUTORIAL_MESSAGES.SETUP_SESSION[1].url}
        tutorialHeaderText={TUTORIAL_MESSAGES.SETUP_SESSION[2].headerText}
        mascotIcon={TUTORIAL_MESSAGES.SETUP_SESSION[3].mascotIcon}
        tutorialFooterText={TUTORIAL_MESSAGES.WATCH_VIDEO}
      />
      <UVSityTutorial
        secondStep
        tutorialMessages={TUTORIAL_MESSAGES.SETUP_MEETING[0].messages}
        srcTutorialUrl={TUTORIAL_MESSAGES.SETUP_MEETING[1].url}
        tutorialHeaderText={TUTORIAL_MESSAGES.SETUP_MEETING[2].headerText}
        mascotIcon={TUTORIAL_MESSAGES.SETUP_MEETING[3].mascotIcon}
        tutorialFooterText={TUTORIAL_MESSAGES.WATCH_VIDEO}
      />

      <UVSityTutorial
        thirdStep
        tutorialMessages={TUTORIAL_MESSAGES.SETUP_AVAILABILITY[0].messages}
        srcTutorialUrl={TUTORIAL_MESSAGES.SETUP_AVAILABILITY[1].url}
        tutorialHeaderText={TUTORIAL_MESSAGES.SETUP_AVAILABILITY[2].headerText}
        mascotIcon={TUTORIAL_MESSAGES.SETUP_AVAILABILITY[3].mascotIcon}
        tutorialFooterText={TUTORIAL_MESSAGES.WATCH_VIDEO}
      />
    </div>
  );
}

export default UVSityTutorialMaster;
