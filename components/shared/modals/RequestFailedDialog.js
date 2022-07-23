import {
  Button,
  Dialog,
  DialogActions,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { REQUEST_FAILED_MESSAGE } from "../../../constants/error-messages";
import Spacer from "../Spacer";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  CONTACT_SUPPORT,
  ERROR_DETAILS,
  REQUEST_FAILED_HEADER,
  RESPONSE_TYPES,
} from "../../../constants/constants";
import ReadMore from "../ReadMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { handleResponse } from "../../../toastr-response-handler/handler";
import { getMode, THEME_MODES } from "../../../theme/ThemeProvider";
toast.configure();

// A reusable component that is used to invoke in scenarios when a async request(invoked via user interaction) fails to serve to the user.
// This is invoked only from component level.
function RequestFailedDialog({
  isOpen,
  message,
  url,
  dialogCloseRequest,
  title,
  theme,
  actionButtonProps,
  diagnostics,
  code,
  name,
  status,
  method,
}) {
  if (!isOpen) return "";
  const isDark = getMode() === THEME_MODES.DARK;
  document.title = message ? message : REQUEST_FAILED_MESSAGE;
  const [expanded, setExpanded] = useState(false);
  const handleClose = (closeInd) => {
    if (dialogCloseRequest) {
      dialogCloseRequest({ close: closeInd });
    }
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const copied = () => {
    handleResponse(
      "Copied",
      RESPONSE_TYPES.SUCCESS,
      toast.POSITION.BOTTOM_CENTER
    );
  };
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="responsive-dialog-title"
      onClose={() => handleClose(false, true)}
      disableEscapeKeyDown
      onBackdropClick={() => handleClose(false, true)}
    >
      <div className={`${isDark ? "dark-dialog" : ""}`}>
        <div className="flex justify-between">
          <div
            className={` px-4 py-3 leading-tight  text-left font-bold flex-col`}
          >
            <Typography gutterBottom variant="h6" component="div">
              <>
                <ErrorIcon /> {title || REQUEST_FAILED_HEADER}
              </>
            </Typography>
          </div>
          <Tooltip title="close">
            <div>
              {handleClose ? (
                <IconButton
                  aria-label="close"
                  onClick={() => handleClose(false, true)}
                  sx={{ marginTop: 2, color: `${isDark ? "#e2e2e2" : ""}` }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              ) : null}
            </div>
          </Tooltip>
        </div>
        <div className={`flex flex-col px-4 mb-2 -mt-3  `}>
          <Typography
            sx={{
              width: "100%",
              flexShrink: 0,
              fontSize: "14px",
              fontWeight: 400,
            }}
            variant="div"
            color={isDark ? "#e2e2e2" : ""}
          >
            {message ? message : REQUEST_FAILED_MESSAGE}
          </Typography>
          <Spacer count={2} />
          <div>
            <Accordion
              className={`${
                theme
                  ? "dark-dialog border-solid border-2 border-white"
                  : "border-solid border-2 border-black"
              }  `}
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon className={`${isDark ? "dark-dialog" : ""}`} />
                }
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  sx={{
                    width: "33%",
                    flexShrink: 0,
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  <u>D</u>etails
                </Typography>

                {!expanded && (
                  <Typography sx={{ color: "darkgrey", fontSize: "12px" }}>
                    {ERROR_DETAILS}
                  </Typography>
                )}
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex-col space-y-2">
                  <>
                    <div className="text-sm flex gap-2">
                      <div className=" text-gray-600">
                        <u>R</u>equest URL:
                      </div>
                      <div className=" line-clamp-1">
                        <Typography sx={{ fontSize: "14px" }}>
                          <a
                            target="_blank"
                            className="app__anchor__block"
                            href={url ? url : window.location.href}
                            rel="noreferrer"
                          >
                            {url ? url : window.location.href}
                          </a>
                        </Typography>
                      </div>
                    </div>
                  </>

                  <>
                    <div className="text-sm flex gap-2">
                      <div className=" text-gray-600">
                        <u>M</u>ethod:
                      </div>
                      <div className=" line-clamp-1">
                        <Typography sx={{ fontSize: "14px" }}>
                          {method ? method : "NA"}
                        </Typography>
                      </div>
                    </div>
                  </>

                  <>
                    <div className="text-sm flex gap-2">
                      <div className=" text-gray-600">
                        <u>S</u>tatus:
                      </div>
                      <div className=" line-clamp-1">
                        <Typography sx={{ fontSize: "14px" }}>
                          {status ? status : 500}
                        </Typography>{" "}
                      </div>
                    </div>
                  </>
                  <>
                    <div className=" text-sm flex gap-2">
                      <div className=" text-gray-600">
                        <u>E</u>rror Code:
                      </div>
                      <Typography sx={{ fontSize: "14px" }}>
                        {code ? code : "Unknown"}
                      </Typography>
                    </div>
                  </>

                  <>
                    <div className=" text-sm flex gap-2">
                      <div className=" text-gray-600">
                        <u>D</u>iagnostics:
                      </div>
                      {diagnostics ? (
                        <>
                          <CopyToClipboard
                            options={{ message: "" }}
                            text={diagnostics}
                            onCopy={() => copied()}
                          >
                            <Tooltip title="Copy to clipboard">
                              <ContentCopyIcon
                                className=" cursor-pointer"
                                fontSize="small"
                              />
                            </Tooltip>
                          </CopyToClipboard>
                          <div className=" overflow-auto max-w-xs max-h-28 text-gray-500 font-mono">
                            <ReadMore coded={true}>{diagnostics}</ReadMore>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className=" line-clamp-1">
                            <Typography sx={{ fontSize: "14px" }}>
                              {CONTACT_SUPPORT}
                            </Typography>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
      <DialogActions className={`${isDark ? "dark-dialog" : ""}`}>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => handleClose(true, false)}
          autoFocus
        >
          {actionButtonProps ? actionButtonProps.YES : "OK"}
        </Button>

        <Button
          color="primary"
          variant="outlined"
          onClick={() => handleClose(true, false)}
          autoFocus
        >
          Report Error
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RequestFailedDialog;
