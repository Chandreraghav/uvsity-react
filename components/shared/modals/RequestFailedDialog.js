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
// A reusable component that is used to invoke in scenarios when a request fails to serve to a response.
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
}) {
  if (!isOpen) return "";
  const [expanded, setExpanded] = useState(false);
  const handleClose = (closeInd) => {
    if (dialogCloseRequest) {
      dialogCloseRequest({ close: closeInd });
    }
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="responsive-dialog-title"
      onClose={() => handleClose(false, true)}
      disableEscapeKeyDown
      onBackdropClick={() => handleClose(false, true)}
    >
      <div className={`${theme ? "dark-dialog" : ""}`}>
        <div className="flex justify-between">
          <div
            className={` px-4 py-3 leading-tight  text-left font-bold flex-col`}
          >
            <Typography gutterBottom variant="h6" component="div">
              <>
                <ErrorIcon /> {title || "Request failed"}{" "}
              </>
            </Typography>
          </div>
          <Tooltip title="close">
            <div>
              {handleClose ? (
                <IconButton
                  aria-label="close"
                  onClick={() => handleClose(false, true)}
                  sx={{ marginTop: 2, color: `${theme ? "#e2e2e2" : ""}` }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              ) : null}
            </div>
          </Tooltip>
        </div>
        <div className="flex flex-col px-4 mb-2 -mt-3 text-gray-600">
          <Typography
            sx={{
              width: "100%",
              flexShrink: 0,
              fontSize: "14px",
              fontWeight: 400,
            }}
            variant="div"
            color="#3b5999"
          >
            {message ? message : REQUEST_FAILED_MESSAGE}
          </Typography>
          <Spacer count={2} />
          <div>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
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
                  <Typography
                    className="ml-auto"
                    sx={{ color: "text.secondary", fontSize: "12px" }}
                  >
                    Click to check error details
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
                          >
                            {url ? url : window.location.href}
                          </a>
                        </Typography>
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
                      <div className=" line-clamp-1">
                        <Typography sx={{ fontSize: "14px" }}>
                          {diagnostics
                            ? diagnostics
                            : "Please contact support if the problem persists further."}
                        </Typography>
                      </div>
                    </div>
                  </>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
      <DialogActions className={`${theme ? "dark-dialog" : ""}`}>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => handleClose(true, false)}
          autoFocus
        >
          {actionButtonProps ? actionButtonProps.YES : "OK"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RequestFailedDialog;
