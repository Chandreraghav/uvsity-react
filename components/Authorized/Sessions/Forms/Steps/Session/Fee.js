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
import Slide from "@mui/material/Slide";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import React, { useEffect, useState } from "react";
import { APP, FEE, SPONSORSHIP } from "../../../../../../constants/userdata";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Plans from "../../../../Sponsorships/Plans";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { handleResponse } from "../../../../../../toastr-response-handler/handler";
import { COLOR_CODES, RESPONSE_TYPES } from "../../../../../../constants/constants";
import ReactMarkdown from "react-markdown";
import { useDataLayerContextValue } from "../../../../../../context/DataLayer";
import { actionTypes } from "../../../../../../context/reducer";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SESSION } from "../../../../../../validation/services/auth/ValidationSchema";
import { AuthService } from "../../../../../../pages/api/users/auth/AuthService";
import { THEME_MODES, useTheme } from "../../../../../../theme/ThemeProvider";
import { makeStyles } from "@material-ui/core/styles";
import SyncFusionRTE from "../../../../../Thirdparty/Editor/SyncFusionRTE";
toast.configure();
function Fee() {
  const Router = useRouter();
  const [theme, _dispatch] = useTheme();
  const [isDark, setDark] = useState(theme.mode === THEME_MODES.DARK);
  const deepGray = COLOR_CODES.GRAY.DEEP;
  const lightGray = COLOR_CODES.GRAY.LIGHT
  const [data, dispatch] = useDataLayerContextValue();
  const [sessionFeePaidIndicator, setSessionPaidInd] = useState(false);
  const [sponsorShipReqd, setSponsorShipReqd] = useState(false);
  const [sessionFee, setSessionFee] = useState(null);
  const [sposnsorshipFee, setSponsorshipFee] = useState(null);
  const [_editSponsorshipLevel, setEditSponsorshipLevel] = useState(false);
  const [sponsorshipLevelOnEdit, setSponsorshipLevelOnEdit] = useState({});
  const [editorData, setEditorData] = useState(null);
  const editSponsorshipLevel = (level) => {
    setEditSponsorshipLevel(true);
    setSponsorshipLevelOnEdit(level);
    setSponsorshipFee(
      level?.current?.price?.text
        ? level?.current?.price?.text
        : level?.defaults?.price?.text
    );
    setDirty("sponsorship-fee");
    updateErrors("sponsorship-fee");
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SPONSOR,
      sponsor: APP.SESSION.DTO.SPONSOR,
    });
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
      APP.SESSION.DTO.SPONSOR.plans = SPONSORSHIP.LEVELS;
      setDirty("sponsorship-plans");
      updateErrors("sponsorship-plans");
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.SPONSOR,
        sponsor: APP.SESSION.DTO.SPONSOR,
      });
      handleCancel(true);
    }
  };
  const handleCancel = (nullifySponsorshipFee) => {
    setSponsorshipLevelOnEdit({});
    setEditSponsorshipLevel(false);
    setEditorData(null);
    if (nullifySponsorshipFee) {
      reset();
      setSponsorshipFee(null);
    }
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
          display: `$${sposnsorshipFee && Number(sposnsorshipFee) > 0
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
      APP.SESSION.DTO.SPONSOR.plans = SPONSORSHIP.LEVELS;
      setDirty("sponsorship-plans");
      updateErrors("sponsorship-plans");
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.SPONSOR,
        sponsor: APP.SESSION.DTO.SPONSOR,
      });
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
    const _sponsorshipLevelOnEdit=sponsorshipLevelOnEdit;
    _sponsorshipLevelOnEdit.current.featured.html=data||"";
    _sponsorshipLevelOnEdit.current.featured.text=data||"";
    setSponsorshipLevelOnEdit(_sponsorshipLevelOnEdit)
    setEditorData(data);
  };

  const handleSessionPaidIndicatorChange = (e) => {
    setSessionPaidInd(!sessionFeePaidIndicator);
    APP.SESSION.DTO.FEE.paidInd = !sessionFeePaidIndicator;
    if (!APP.SESSION.DTO.FEE.paidInd) {
      setSessionFee(null);
      APP.SESSION.DTO.FEE.amount = null;
    }
    setDirty("session-fee");
    updateErrors("session-fee");
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.FEES,
      fees: APP.SESSION.DTO.FEE,
    });
  };
  const handleSponsorshipReqdChange = () => {
    setSponsorShipReqd(!sponsorShipReqd);
    APP.SESSION.DTO.SPONSOR.sponsorShipInd = !sponsorShipReqd;
    setDirty("session-sponsorship");
    updateErrors("session-sponsorship");
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SPONSOR,
      sponsor: APP.SESSION.DTO.SPONSOR,
    });
  };
  const setDirty = (handle) => {
    if (handle === "session-fee") {
      APP.SESSION.DTO.FEE.dirty = true;
    } else {
      APP.SESSION.DTO.SPONSOR.dirty = true;
    }
  };

  const formOptions = {
    resolver: yupResolver(SESSION.CREATE.STEPS.FEE),
    mode: "all",
  };
  const { register, formState, watch, reset } = useForm(formOptions);
  const { errors } = formState;

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  const handleFeeChange = (e) => {
    const num = e.target.value;
    setSessionFee(num);
    APP.SESSION.DTO.FEE.amount = num;
    setDirty("session-fee");
    updateErrors("session-fee");
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.FEES,
      fees: APP.SESSION.DTO.FEE,
    });
  };
  const handleSponsorshipFeeChange = (e) => {
    const num = e.target.value;
    setSponsorshipFee(num);
    setDirty("sponsorship-fee");
    updateErrors("sponsorship-fee");
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SPONSOR,
      sponsor: APP.SESSION.DTO.SPONSOR,
    });
  };
  const updateErrors = (handle) => {
    if (handle === "session-fee") {
      APP.SESSION.DTO.FEE.errors = errors;
    } else {
      APP.SESSION.DTO.SPONSOR.errors = errors;
    }
  };
  const useStyles = makeStyles((theme) => ({
    paper: {
      "& .MuiMenu-paper": {
        backgroundColor: isDark ? COLOR_CODES.BLACK.DARK : "",
      }
    },
    root: {
      "& .MuiFormLabel-root": {
        color: isDark ? deepGray : "", // or black
      },
    },
    input: {
      color: isDark ? deepGray : "",
      borderBottom: `1px solid ${isDark ? deepGray : "none"}`,
      "&:focus": {
        borderBottom: "none",
      },
    },
    select: {
      color: isDark ? deepGray : "",

      "&:before": {
        borderBottom: ` ${isDark ? `1px solid ${lightGray}` : ""}`,
      },
    },
    icon: {
      fill: isDark ? deepGray : "inherit",
    },

    menuItem: {
      backgroundColor: isDark ? COLOR_CODES.BLACK.DARK : "",
      color: isDark ? `${deepGray}` : "",
      "&.Mui-selected": {
        backgroundColor: `${isDark ? COLOR_CODES.BLUE.DARK : ""}`,
        color: isDark ? `${deepGray}` : "",
        fontWeight: 600,
      },
      "&:hover": {
        backgroundColor: isDark ? `${COLOR_CODES.BLUE.LIGHT}!important` : "",

      },
    },
  }));
  const classes = useStyles();
  useEffect(() => {
    if (sponsorShipReqd) {
      if (_editSponsorshipLevel) {
        let obj = null;
        if (!editorData) {
          // back to default;
          obj = {
            price: {
              text:
                sposnsorshipFee && sposnsorshipFee > 0
                  ? Number(sposnsorshipFee)
                  : null,
              display: `$${sposnsorshipFee && Number(sposnsorshipFee) > 0
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
          APP.SESSION.DTO.SPONSOR.plans = SPONSORSHIP.LEVELS;
        }
      } else {
        APP.SESSION.DTO.SPONSOR.plans = SPONSORSHIP.LEVELS;
      }
      setDirty("sponsorship-fee");
      updateErrors("sponsorship-fee");
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.SPONSOR,
        sponsor: APP.SESSION.DTO.SPONSOR,
      });
    }
  }, [sponsorShipReqd, sposnsorshipFee]);

  useEffect(() => {
    if (data.fees || data.sponsor) {
      // fetch data from context on load of form step.
      setSessionPaidInd(data?.fees?.paidInd);
      setSessionFee(data?.fees?.paidInd ? data?.fees?.amount : null);
      setSponsorShipReqd(data?.sponsor?.sponsorShipInd);
      setSponsorshipFee(
        data?.sponsor?.sponsorShipInd ? data?.sponsor?.amount : null
      );
      SPONSORSHIP.LEVELS = data?.sponsor?.plans
        ? data?.sponsor?.plans
        : SPONSORSHIP.LEVELS;
    } else {
      setDirty("session-fee");
      APP.SESSION.DTO.requestPath = Router.asPath;
      APP.SESSION.DTO.user = AuthService.getCurrentUser();
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.FEES,
        fees: APP.SESSION.DTO.FEE,
      });
      setDirty();
      APP.SESSION.DTO.SPONSOR.plans = SPONSORSHIP.LEVELS;
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.SPONSOR,
        sponsor: APP.SESSION.DTO.SPONSOR,
      });
    }
  }, []);
  useEffect(() => {
    setDark(theme.mode === THEME_MODES.DARK);
  }, [theme]);
  return (
    <Slide direction="bottom" in={true}>
      <div className={`p-4 min-h-screen`}>
        <Box sx={{ width: "100%" }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>

              <div className="flex   gap-2 ">
                <div className=" flex leading-loose lg:text-3xl text-xl md:text-3xl text-gray-700">
                  <div className="flex dark:text-gray-400  text-gray-900">
                    <Typography gutterBottom variant="h4" component="div">
                      Paid session
                    </Typography>
                    <Tooltip
                      title={SPONSORSHIP.MESSAGES.INFO.SESSION_FEE_HELPTEXT}
                    >
                      <div className=" text-sm text-gray-600 cursor-pointer">
                        <HelpOutlineIcon fontSize="small" />
                      </div>
                    </Tooltip>


                  </div>

                </div>
                <FormControl variant="filled">
                  <FormControlLabel
                    className=" dark:text-gray-400  text-gray-900"
                    control={
                      <Switch
                        id="freeSessionOrPaid"
                        size="medium"
                        {...register(`freeSessionOrPaid`)}
                        onChange={() => handleSessionPaidIndicatorChange()}
                        checked={sessionFeePaidIndicator}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                  />
                </FormControl>
              </div>
            </Grid>
            {sessionFeePaidIndicator && (
              <>
                <Grid item xs={12}>
                  <FormControl variant="standard" fullWidth>
                    <Box
                      fullWidth
                      sx={{ display: "flex", alignItems: "flex-end" }}
                    >
                      <AttachMoneyIcon color="primary" />
                      <TextField
                        id="fees"
                        label="Session fee"
                        variant="standard"
                        fullWidth
                        placeholder="Enter session fee"
                        value={sessionFee}
                        type="number"
                        inputProps={{ className: classes.input }}
                    className={classes.root}
                        {...register(`fees`, {
                          onChange: (event) => {
                            debounce(handleFeeChange(event), 500);
                          },
                        })}
                        helperText={errors.fees?.message}
                        error={errors.fees?.message ? true : false}
                      />
                    </Box>
                  </FormControl>
                  <div className=" dark:text-gray-600 text-blue-800 lg:text-md text-xs md:text-sm leading-tight flex gap-2 px-3 py-1">
                    <div>{FEE.PROMO_CODES.icon}</div>
                    <div>{FEE.PROMO_CODES.text}</div>
                  </div>

                  {sessionFee && !isNaN(sessionFee) && sessionFee > 0 && (
                    <>
                      <div className=" text-green   lg:text-xl text-xs md:text-sm leading-tight font-semibold flex gap-2 px-3 py-1">
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
              <div className="flex gap-2 ">
                <div className="flex leading-loose lg:text-3xl text-xl md:text-3xl text-gray-700">
                  <div className="flex dark:text-gray-400  text-gray-900">
                    <Typography gutterBottom variant="h5" component="div">
                      Sponsorships
                    </Typography>
                    <Tooltip
                      title={
                        SPONSORSHIP.MESSAGES.INFO.SESSION_SPONSORSHIP_HELPTEXT
                      }
                    >
                      <div className=" text-xs text-gray-600 cursor-pointer">
                        <HelpOutlineIcon fontSize="small" />
                      </div>
                    </Tooltip>
                  </div>
                </div>
                <FormControl variant="filled">
                  <FormControlLabel
                    className=" dark:text-gray-400  text-gray-900"
                    control={
                      <Switch
                        size="medium"
                        checked={sponsorShipReqd}
                        {...register(`sponsorshipReqd`)}
                        onChange={() => handleSponsorshipReqdChange()}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                  />
                </FormControl>
              </div>
              {sponsorShipReqd && (
                <>
                  <div className="items-center  py-2 flex dark:text-gray-300 ">
                    <Typography

                      gutterBottom
                      variant="subtitle"
                      component="div"
                    >
                      {!_editSponsorshipLevel && (
                        <>
                          {SPONSORSHIP.ICONS.CUSTOMIZE_V2} 🤔Looks like you are looking for sponsorships! Now customize your sponsorship
                          offerings to your audience. Click on the{" "}
                          {SPONSORSHIP.ICONS.EDIT} Edit icon to make any changes.
                        </>
                      )}

                      {_editSponsorshipLevel && (
                        <>
                          {SPONSORSHIP.ICONS.CUSTOMIZE} Customize your sponsorship
                          offerings on the{" "}
                          <strong
                            className={`${sponsorshipLevelOnEdit.alias === "Gold"
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
                          className="ml-auto cursor-pointer app-anchor-block"
                          onClick={() => handleCancel(true)}
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
                {SPONSORSHIP?.LEVELS?.map((level) => (
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

                      <TextField
                        id="sponsorshipFee"
                        label="Sponsorship fee"
                        variant="standard"
                        fullWidth
                        type="number"
                        value={sposnsorshipFee}
                        placeholder="Enter sponsorship fee"
                        inputProps={{ className: classes.input }}
                    className={classes.root}
                        {...register(`sponsorshipFee`, {
                          onChange: (event) => {
                            debounce(handleSponsorshipFeeChange(event), 500);
                          },
                        })}
                        helperText={errors.sponsorshipFee?.message}
                        error={errors.sponsorshipFee?.message ? true : false}
                      />
                    </Box>
                    {sposnsorshipFee &&
                      !isNaN(sposnsorshipFee) &&
                      sposnsorshipFee > 0 && (
                        <>
                          <div className="text-green lg:text-md text-xs md:text-sm leading-tight font-semibold flex gap-2 px-3 py-1">
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
                        className="  dark:text-gray-400  text-gray-900 font-normal"
                        id="session-summary"
                      >
                        Pre-customized offering Template
                      </label>
                      <Tooltip
                        title={
                          SPONSORSHIP.MESSAGES.INFO
                            .PRE_CUSTOMIZED_TEMPLATE_HELP_TEXT
                        }
                      >
                        <div className=" text-gray-600 cursor-pointer">
                          <HelpOutlineIcon fontSize="small" />
                        </div>
                      </Tooltip>
                    </div>

                     

<SyncFusionRTE  
                     
                    placeholder="Pre-customized offering Template"
                    data={
                      sponsorshipLevelOnEdit?.current?.featured?.text
                        ? sponsorshipLevelOnEdit.current?.featured.text
                        : sponsorshipLevelOnEdit.defaults?.featured.text
                    }
                    height={300}
                     
                    getDataOnChange={handleEditorDataOnChange}/>


                  </FormControl>

                  <div className="save-sponsorship-action-buttons  ">
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
                        onClick={() => handleCancel(true)}
                        aria-label="save-sponsorship-cancel"
                        size="small"
                      >
                        <CancelIcon color="warning" fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </div>
    </Slide>
  );
}

export default Fee;
