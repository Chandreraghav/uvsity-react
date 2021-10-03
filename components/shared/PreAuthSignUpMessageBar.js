import React, { useState } from "react";
import PreAuthSignUpMessageBarStyle from "../../styles/PreAuthSignUpMessageBar.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import Tooltip from "@mui/material/Tooltip";
import {PRE_AUTH_SIGNUP_MESSAGE_BAR_TEXT} from '../../constants/constants'
function PreAuthSignUpMessageBar({ isPreAuthMessagePanelClosed }) {
  const [close, setClose] = useState(false);
  const closePreAuthMessagePanel = () => {
    isPreAuthMessagePanelClosed(true);
    setClose(true);
  };
  return (
    !close && (
      <div>
        <div className={PreAuthSignUpMessageBarStyle.app__preAuthMessage}>
          <div>
            {PRE_AUTH_SIGNUP_MESSAGE_BAR_TEXT}
          </div>

          <Tooltip
            className={PreAuthSignUpMessageBarStyle.cancelButtonRoot}
            title="Close"
            disableTouchListener
            placement="bottom"
          >
            <div>
              <CancelIcon
                onClick={(e) => closePreAuthMessagePanel()}
                className={PreAuthSignUpMessageBarStyle.cancelButton}
              />
            </div>
          </Tooltip>
        </div>
      </div>
    )
  );
}

export default PreAuthSignUpMessageBar;
