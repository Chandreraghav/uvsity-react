import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import React, { useState } from "react";
import { FEE, SPONSORSHIP } from "../../../../../../constants/userdata";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Plans from "../../../../Sponsorships/Plans";
import { toast } from "react-toastify";
import { handleResponse } from "../../../../../../toastr-response-handler/handler";
import { RESPONSE_TYPES } from "../../../../../../constants/constants";
import ReactMarkdown from 'react-markdown'
import CEditor from "../../../../../Thirdparty/Editor/CKEditor";
toast.configure();
function Fee() {
  const [freeSession, setSessionFree] = useState(true);
  const [sponsorShipReqd, setSponsorShipReqd] = useState(false);
  const [sessionFee, setSessionFee] = useState(null);
  const [sposnsorshipFee, setSponsorshipFee] = useState(null);
  const [_editSponsorshipLevel, setEditSponsorshipLevel] = useState(false);
  const [sponsorshipLevelOnEdit, setSponsorshipLevelOnEdit] = useState({});
  const [editorData, setEditorData] = useState(null);
  const editSponsorshipLevel = (level) => {
    setSponsorshipLevelOnEdit(level);
    setSponsorshipFee(
      level.current.price.text
        ? level.current.price.text
        : level.defaults.price.text
    );
    setEditSponsorshipLevel(true);
  };

  const resetSponsorshipLevel = (level) => {
    let obj = {
      price: {
        text: null,
        display: ``,
      },
      featured: {
        text: ``,
        html: null,
      },
    };
    const edits = level;
    edits.current = obj;
    edits.dirty = false;
    const editIdx = SPONSORSHIP.LEVELS.findIndex(
      (level) => level.id === edits.id
    );
    if (editIdx !== -1) {
      SPONSORSHIP.LEVELS[editIdx] = edits;
      handleCancel();
    }
  };
  const handleCancel = () => {
    setSponsorshipLevelOnEdit({});
    setEditSponsorshipLevel(false);
    setEditorData(null);
    setSponsorshipFee(null);
  };
  const handleSaveSponsorshipOffering = () => {
    let obj = null;
    if (!editorData) {
      // back to default;
      obj = {
        price: {
          text:
            sposnsorshipFee && sposnsorshipFee > 0
              ? Number(sposnsorshipFee)
              : null,
          display: `$${
            sposnsorshipFee && Number(sposnsorshipFee) > 0
              ? sposnsorshipFee
              : ""
          }`,
        },
        featured: {
          text: ``,
          html: null,
        },
      };
    } else {
      obj = {
        price: {
          text: Number(sposnsorshipFee),
          display: `$${sposnsorshipFee}`,
        },
        featured: {
          text: editorData,
          html: <ReactMarkdown>{editorData}</ReactMarkdown>,
        },
      };
    }

    const edits = sponsorshipLevelOnEdit;
    edits.current = obj;
    edits.dirty =
      editorData ||
      Number(sposnsorshipFee) !== Number(edits.defaults.price.text)
        ? true
        : false;

    const editIdx = SPONSORSHIP.LEVELS.findIndex(
      (level) => level.id === edits.id
    );
    if (editIdx !== -1) {
      SPONSORSHIP.LEVELS[editIdx] = edits;
      handleCancel();
    } else {
      handleResponse(
        SPONSORSHIP.MESSAGES.ERRORS.EDITS,
        RESPONSE_TYPES.ERROR,
        toast.POSITION.BOTTOM_CENTER
      );
    }
  };

  const handleEditorDataOnChange = (data) => {
    const _data = data.length;
    setEditorData(data);
  };
  return (
    <div className={`p-4`}>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={12}>
            <div className="flex gap-4 justify-center">
              <div className=" leading-loose lg:text-3xl text-xl md:text-3xl text-gray-700">
                <Typography gutterBottom variant="h4" component="div">
                  Free session
                </Typography>
              </div>
              <FormControl variant="filled">
                <FormControlLabel
                  className=" text-gray-600"
                  control={
                    <Switch
                      size="medium"
                      onChange={() => setSessionFree(!freeSession)}
                      checked={freeSession}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label={
                    <>
                      <h3 className="lg:text-3xl text-xl md:text-3xl">Yes</h3>
                    </>
                  }
                />
              </FormControl>
            </div>
          </Grid>
          {!freeSession && (
            <>
              <Grid item xs={12}>
                <FormControl variant="standard" fullWidth>
                  <Box
                    fullWidth
                    sx={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <AttachMoneyIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                      id="session-fee"
                      label="Session fee"
                      variant="standard"
                      fullWidth
                      placeholder="Enter session fee"
                      value={sessionFee}
                      onChange={(e) => setSessionFee(e.target.value)}
                    />
                  </Box>
                </FormControl>
                <div className="text-blue-600 lg:text-xl text-xs md:text-sm leading-tight flex gap-2 px-3 py-1">
                  <div>{FEE.PROMO_CODES.icon}</div>
                  <div>{FEE.PROMO_CODES.text}</div>
                </div>

                {sessionFee && !isNaN(sessionFee) && sessionFee > 0 && (
                  <>
                    <div className="text-green-600 lg:text-xl text-xs md:text-sm leading-tight font-semibold flex gap-2 px-3 py-1">
                      <div>{FEE.HELP_TEXT.ICON}</div>
                      <div>
                        {FEE.HELP_TEXT.SET_FEE_TYPEWRITER.replace(
                          "#XX",
                          sessionFee
                        )}
                      </div>
                    </div>
                  </>
                )}
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <div className="flex gap-4 justify-center">
              <div className=" leading-loose lg:text-3xl text-xl md:text-3xl text-gray-700">
                <Typography gutterBottom variant="h5" component="div">
                  Looking for sponsors?
                </Typography>
              </div>
              <FormControl variant="filled">
                <FormControlLabel
                  className=" text-gray-600"
                  control={
                    <Switch
                      size="medium"
                      checked={!sponsorShipReqd}
                      onChange={() => setSponsorShipReqd(!sponsorShipReqd)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label={
                    <>
                      <h3 className="lg:text-3xl text-xl md:text-3xl">No</h3>
                    </>
                  }
                />
              </FormControl>
            </div>
            {sponsorShipReqd && (
              <>
                <div className="items-center justify-center py-2 flex">
                  <Typography
                    color="text.secondary"
                    gutterBottom
                    variant="h6"
                    component="div"
                  >
                    {!_editSponsorshipLevel && (
                      <>
                        {SPONSORSHIP.ICONS.CUSTOMIZE} Customize your sponsorship
                        offerings to your audience. Click on the{" "}
                        {SPONSORSHIP.ICONS.EDIT} Edit icon to make any changes.
                      </>
                    )}

                    {_editSponsorshipLevel && (
                      <>
                        {SPONSORSHIP.ICONS.CUSTOMIZE} Customize your sponsorship
                        offerings on the{" "}
                        <strong
                          className={`${
                            sponsorshipLevelOnEdit.alias === "Gold"
                              ? "text-yellow-600"
                              : sponsorshipLevelOnEdit.alias === "Platinum"
                              ? " text-blue-600"
                              : ""
                          }`}
                        >
                          {sponsorshipLevelOnEdit.alias}
                        </strong>{" "}
                        plan
                      </>
                    )}
                  </Typography>
                  {_editSponsorshipLevel && (
                    <>
                      <div
                        className="ml-auto cursor-pointer app__anchor__block"
                        onClick={handleCancel}
                      >
                        <ArrowBackIcon />
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </Grid>

          {sponsorShipReqd && !_editSponsorshipLevel && (
            <>
              {SPONSORSHIP.LEVELS.map((level) => (
                <Plans
                  editSponsorshipdata={() => editSponsorshipLevel(level)}
                  key={level.id}
                  data={level}
                  onResetSponsorShip={() => resetSponsorshipLevel(level)}
                />
              ))}
            </>
          )}
          {_editSponsorshipLevel && sponsorShipReqd && (
            <>
              <Grid item xs={12} className="-mt-2">
                <FormControl className="mb-2" variant="standard" fullWidth>
                  <Box
                    fullWidth
                    sx={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <AttachMoneyIcon
                      sx={{ color: "action.active", mr: 1, my: 1.5 }}
                    />
                    <TextField
                      id="sponsorship-fee"
                      label="Sponsorship fee"
                      variant="outlined"
                      onChange={(e) => setSponsorshipFee(e.target.value)}
                      fullWidth
                      required
                      type="number"
                      value={sposnsorshipFee}
                      placeholder="Enter sponsorship fee"
                    />
                  </Box>
                  {sposnsorshipFee &&
                    !isNaN(sposnsorshipFee) &&
                    sposnsorshipFee > 0 && (
                      <>
                        <div className="text-green-600 lg:text-md text-xs md:text-sm leading-tight font-semibold flex gap-2 px-3 py-1">
                          <div>{FEE.HELP_TEXT.ICON}</div>
                          <div>
                            {SPONSORSHIP.MESSAGES.INFO.SET_FEE_TYPEWRITER.replace(
                              "#XX",
                              sposnsorshipFee
                            )}
                          </div>
                        </div>
                      </>
                    )}
                </FormControl>

                <FormControl
                  fullWidth={true}
                  variant="standard"
                  sx={{ marginBottom: 1 }}
                >
                  <div className="flex gap-1 py-2">
                    <label
                      className=" text-gray-600 font-normal"
                      id="session-summary"
                    >
                      Pre-customized offering Template
                    </label>
                    <Tooltip title="This is a pre-customized sponsorship offering example template for you. You are free to tailor it according your sponsosrship needs.">
                      <div className=" cursor-pointer">
                        <HelpOutlineIcon fontSize="small" />
                      </div>
                    </Tooltip>
                  </div>

                  <CEditor
                    getDataOnChange={handleEditorDataOnChange}
                    data={
                       
                      sponsorshipLevelOnEdit?.current?.featured?.text
                        ? sponsorshipLevelOnEdit.current?.featured.text
                        : sponsorshipLevelOnEdit.defaults?.featured.text
                    }
                  />
                </FormControl>

                <div className="save-sponsorship-action-buttons border-dotted border-2">
                  <Tooltip title={"Save sponsorship"}>
                    <IconButton
                      onClick={handleSaveSponsorshipOffering}
                      aria-label="save-sponsorship-done"
                      size="small"
                    >
                      <CheckCircleIcon color="primary" fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Cancel"}>
                    <IconButton
                      onClick={handleCancel}
                      aria-label="save-sponsorship-cancel"
                      size="small"
                    >
                      <CancelIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </div>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </div>
  );
}

export default Fee;
