import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import Profile from "../../../../Network/People/Listing/Search/Profile";
import SearchService from "../../../../../../pages/api/people/network/Search/SearchService";
import SnapProfile from "../../../../Network/People/Listing/Snap/Profile";
import UserDataService from "../../../../../../pages/api/users/data/UserDataService";
import { useQuery } from "react-query";
import { KEYS } from "../../../../../../async/queries/keys/unique-keys";
import ParticipantStyles from "../../../../../../styles/Participant.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Switch from "@mui/material/Switch";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  APP,
  PARTICIPANT_INVITATION_OPTIONS,
  PARTICIPANT_QUESTIONAIRRES,
} from "../../../../../../constants/userdata";
import Questions from "../../../../../shared/Questionairre/Questions";
import { CUSTOM_QUESTION_OPTS } from "../../../../../../constants/questionairre";
import QuestionairreService from "../../../../../../pages/api/session/QuestionairreService";
import ConfirmDialog from "../../../../../shared/modals/ConfirmDialog";
import { handleResponse } from "../../../../../../toastr-response-handler/handler";
import { RESPONSE_TYPES } from "../../../../../../constants/constants";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SESSION_ERROR } from "../../../../../../constants/error-messages";
import { useDataLayerContextValue } from "../../../../../../context/DataLayer";
import { useRouter } from "next/router";
import { actionTypes } from "../../../../../../context/reducer";
import { AuthService } from "../../../../../../pages/api/users/auth/AuthService";
import { SESSION } from "../../../../../../validation/services/auth/ValidationSchema";
toast.configure();
function Participant(props) {
  const Router = useRouter();
  const [data, dispatch] = useDataLayerContextValue();
  const [processing, setProcessing] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [expectedNumberofParticipants, setNumberOfParticipants] =
    useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemSelected, setItemSelected] = useState(false);
  const [customQuestionsToParticipants, setCustomQuestionsToParticipants] =
    useState(false);

  const [questionairreIdentifier, setQuestionairreIdentifier] = useState(null);
  const [questionairre, setQuestionairre] = useState(null);
  const [
    showDeleteQuestionairreConfirmDialog,
    setShowDeleteQuestionairreConfirmDialog,
  ] = useState(false);
  const [publicVisibility, setVisibilityPublic] = useState(true);
  const [selectedChoiceOfInvitation, setSelectedChoiceOfInvitation] =
    useState(0);
  const label = {
    inputProps: { "aria-label": "Switch for session accessibility" },
  };
  const getLoggedInInformation = async () =>
    (await UserDataService.getLoggedInInformation()).data;
  const USER_LOGIN_INFO = useQuery([KEYS.LOGIN.INFO], getLoggedInInformation, {
    refetchOnWindowFocus: false,
  });
  const changeHandler = (event) => {
    setQuery(event.target.value);
    setTimeout(() => {
      if (
        event.target.value &&
        event.target.value.trim().length >= 3 &&
        event.target.value !== ""
      ) {
        SearchService.searchCoHosts(event.target.value)
          .then((res) => {
            if (res?.data) {
              setSearchResults(res?.data);
            }
          })
          .catch(() => {
            setSearchResults([]);
          });
      } else {
        if (searchResults.length > 0 && event.target.value.trim().length == 0)
          setSearchResults([]);
      }
    }, 200);
  };
  const handleSelect = (event) => {
    setItemSelected(true);
    UserDataService.getUserById(event.entityId)
      .then((res) => {
        const index = selectedItems.findIndex(
          (selectedItem) => selectedItem.entityId === event.entityId
        );
        if (index === -1) {
          selectedItems.unshift(event);
        }
        setDirty();
        setSelectedItem(res.data);
        setQuery("");
        APP.SESSION.DTO.PARTICIPANTS.cohost = res.data;
        dispatch({
          type: actionTypes.CREATE_SESSION_WORKFLOW.PARTICIPANT,
          participant: APP.SESSION.DTO.PARTICIPANTS,
        });
      })
      .catch(() => {
        setSelectedItem(null);
        APP.SESSION.DTO.PARTICIPANTS.cohost = null;
        dispatch({
          type: actionTypes.CREATE_SESSION_WORKFLOW.PARTICIPANT,
          participant: APP.SESSION.DTO.PARTICIPANTS,
        });
      })
      .finally(() => {
        setSearchResults([]);
        setQuery("");
        setItemSelected(false);
      });
  };
  const handleRemoveParticipant = () => {
    setDirty();
    setSelectedItem(null);
    setSelectedItems([]);
    setQuery("");
    setItemSelected(false);
    APP.SESSION.DTO.PARTICIPANTS.cohost = null;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.PARTICIPANT,
      participant: APP.SESSION.DTO.PARTICIPANTS,
    });
  };
  const onSaveQuestions = (data) => {
    setDirty();
    setQuestionairreIdentifier(data);
    setCustomQuestionsToParticipants(false);
    APP.SESSION.DTO.PARTICIPANTS.questions = data;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.PARTICIPANT,
      participant: APP.SESSION.DTO.PARTICIPANTS,
    });
  };
  const onCancelQuestions = (data) => {
    setDirty();
    setCustomQuestionsToParticipants(false);
    APP.SESSION.DTO.PARTICIPANTS.questions = null;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.PARTICIPANT,
      participant: APP.SESSION.DTO.PARTICIPANTS,
    });
  };
  const handleQuestionClick = () => {
    if (questionairreIdentifier && questionairreIdentifier > 0) {
      setProcessing(true);
      // call api to fetch the questions with identifier
      QuestionairreService.getQuestionairre(questionairreIdentifier)
        .then((res) => {
          setCustomQuestionsToParticipants(true);
          setQuestionairre(res.data);
          setProcessing(false);
          setTimeout(() => {
            scrollDivToBottom("custom-question-box");
            window.scrollTo(0, document.body.scrollHeight);
          }, 150);
        })
        .catch((err) => {
          setProcessing(false);
          setCustomQuestionsToParticipants(false);
        });
    } else {
      setCustomQuestionsToParticipants(true);
      setTimeout(() => {
        scrollDivToBottom("custom-question-box");
        window.scrollTo(0, document.body.scrollHeight);
      }, 150);
    }
  };
  const handleDeleteQuestionairreClick = () => {
    // throw dialog
    setShowDeleteQuestionairreConfirmDialog(true);
  };
  const handleConfirmDialogRequest = (requestInd) => {
    if (requestInd.confirm) {
      // delete
      setProcessing(true);
      // call api to delete the questionairre with identifier
      QuestionairreService.removeQuestionairre(questionairreIdentifier)
        .then((res) => {
          if (res.data.success) {
            setDirty();
            setCustomQuestionsToParticipants(false);
            setQuestionairre(null);
            setProcessing(false);
            setQuestionairreIdentifier(null);
            APP.SESSION.DTO.PARTICIPANTS.questions = null;
            dispatch({
              type: actionTypes.CREATE_SESSION_WORKFLOW.PARTICIPANT,
              participant: APP.SESSION.DTO.PARTICIPANTS,
            });
            handleResponse(
              PARTICIPANT_QUESTIONAIRRES.DELETED,
              RESPONSE_TYPES.SUCCESS,
              toast.POSITION.BOTTOM_CENTER
            );
          } else {
            handleResponse(
              getWorkflowError(SESSION_ERROR.QUESTIONAIRRE.DELETE),
              RESPONSE_TYPES.ERROR,
              toast.POSITION.BOTTOM_CENTER
            );
            setProcessing(false);
          }
        })
        .catch((err) => {
          handleResponse(
            getWorkflowError(SESSION_ERROR.QUESTIONAIRRE.DELETE),
            RESPONSE_TYPES.ERROR,
            toast.POSITION.BOTTOM_CENTER
          );
          setProcessing(false);
        })
        .finally(() => {
          setShowDeleteQuestionairreConfirmDialog(false);
        });

      return;
    }
    if (requestInd.close) {
      setShowDeleteQuestionairreConfirmDialog(false);
    }
  };
  const scrollDivToBottom = (div) => {
    var objDiv = document.getElementById(div);
    if(objDiv)
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  const formOptions = {
    resolver: yupResolver(SESSION.CREATE.STEPS.PARTICIPANT),
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
  const handleExpectedNumberOfParticipants = (e) => {
    setDirty();
    setNumberOfParticipants(e.target.value);
    APP.SESSION.DTO.PARTICIPANTS.numberOfParticipants = e.target.value;
    updateErrors()
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.PARTICIPANT,
      participant: APP.SESSION.DTO.PARTICIPANTS,
    });
  };
  const handleSelectedChoiceOfInvitationChange = (event) => {
    setDirty();
    setSelectedChoiceOfInvitation(event.target.value);
    APP.SESSION.DTO.PARTICIPANTS.choiceOfInvitation = event.target.value;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.PARTICIPANT,
      participant: APP.SESSION.DTO.PARTICIPANTS,
    });
  };
  const setDirty = () => {
    APP.SESSION.DTO.PARTICIPANTS.dirty = true;
  };
  const updateErrors = () => {
    APP.SESSION.DTO.PARTICIPANTS.errors = errors;
  };
  const handleVisibilityChange = (e) => {
    setDirty();
    setVisibilityPublic(e.target.checked);
    APP.SESSION.DTO.PARTICIPANTS.visibility = e.target.checked;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.PARTICIPANT,
      participant: APP.SESSION.DTO.PARTICIPANTS,
    });
  };
  useEffect(() => {
    if (data.participant) {
      console.log(data)
      // fetch data from context on load of form step.
      setNumberOfParticipants(
        data?.participant?.numberOfParticipants
          ? parseInt(data?.participant?.numberOfParticipants)
          : null
      );
      setVisibilityPublic(
        data?.participant?.visibility ? data?.participant?.visibility : false
      );
      setSelectedChoiceOfInvitation(
        data?.participant?.choiceOfInvitation
          ? data?.participant?.choiceOfInvitation
          : 0
      );
      setQuestionairreIdentifier(
        data?.participant?.questions ? data?.participant?.questions : null
      );
    
      setSelectedItem(
        data?.participant?.cohost ? data?.participant?.cohost : null
      );
      setItemSelected(data?.participant?.cohost ? true : false);
    } else {
      APP.SESSION.DTO.requestPath = Router.asPath;
      APP.SESSION.DTO.user = AuthService.getCurrentUser();
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.PARTICIPANT,
        participant: APP.SESSION.DTO.PARTICIPANTS,
      });
    }
  }, []);

  return (
    <div className={`p-4 ${processing ? "control__disabled__opaque" : ""}`}>
      
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {/* CO-HOST SEARCH AND FIX */}
            <Grid item xs={12}>
              {/* Co Host Info */}
              {selectedItem === null && (
                <FormControl
                  variant="standard"
                  sx={{ marginBottom: 1, marginTop: 1, width: "100%" }}
                >
                  <TextField
                    onChange={changeHandler}
                    value={query}
                    placeholder="You may look for a co-host here"
                    variant="standard"
                    label="Co-Host Name"
                    id="cohost"
                  />
                </FormControl>
              )}

              {selectedItem && (
                <div
                  className={`py-1 px-1 mt-3 flex flex-col   gap-2    border-0   shadow-sm bg-repeat-round rounded-lg  `}
                >
                  <div className="text-md flex gap-2">
                    <CoPresentIcon />{" "}
                    <span className="text-md leading-snug font-semibold">
                      Your co-host
                    </span>
                  </div>
                  <div className="flex">
                    <SnapProfile
                      firstName={selectedItem.firstName}
                      lastName={selectedItem.lastName}
                      avatar={selectedItem.profilepicName}
                      userType={selectedItem.userType}
                      instituition={selectedItem.eduIns}
                      oid={selectedItem.userDetailsId}
                      userdata={USER_LOGIN_INFO?.data}
                    />
                    <div className="ml-auto">
                      <Tooltip title="Remove co-host">
                        <DeleteIcon
                          onClick={handleRemoveParticipant}
                          size="small"
                          className="app__anchor__block cursor-pointer"
                        />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              )}

              {searchResults.length > 0 && (
                <div
                  className={`${itemSelected ? "control__disabled" : ""} ${
                    ParticipantStyles.participant__search__results
                  } flex flex-col gap-2 pb-2 pt-2  px-2 shadow-xl absolute w-full overflow-y-auto`}
                >
                  {searchResults?.map((searchResult) => (
                    <Profile
                      onSelect={handleSelect}
                      key={searchResult.entityId}
                      data={searchResult}
                    />
                  ))}
                </div>
              )}
            </Grid>
            {/* EXPECTED PARTICIPANTS */}
            <Grid item xs={12}>
              <FormControl
                variant="filled"
                sx={{ marginBottom: 1, width: "100%" }}
              >
                <TextField
                  variant="standard"
                  label="Expected number of participants"
                  id="expectedNumber"
                  name="expectedNumber"
                  value={expectedNumberofParticipants}
                  type="number"
                  {...register(`expectedNumber`, {
                    onChange: (event) => {
                      debounce(handleExpectedNumberOfParticipants(event), 500);
                    },
                  })}
                  helperText={errors.expectedNumber?.message}
                  error={errors.expectedNumber?.message ? true : false}
                  required
                />
                <FormHelperText className="blue-text leading-tight -ml-1 font-semibold">
                  For 100+ participants, premium membership is required.
                </FormHelperText>
              </FormControl>
            </Grid>
            {/* SESSION VISIBILITY */}
            <Grid item lg={6} xs={12}>
              <div className=" flex-col">
                <div className=" flex gap-1 text-gray-600 font-normal">
                  <div>Visibility</div>
                  <Tooltip title="How do you want your session to be visible, public or private?">
                    <div className=" cursor-pointer">
                      <HelpOutlineIcon fontSize="small" />
                    </div>
                  </Tooltip>
                </div>
                <FormControl
                  className="flex"
                  variant="filled"
                  sx={{ marginBottom: 1, width: "100%" }}
                >
                  <div className="flex">
                    <FormControlLabel
                      className="text-xs text-gray-600"
                      control={
                        <Switch
                          checked={publicVisibility}
                          inputProps={{ "aria-label": "controlled" }}
                          onChange={handleVisibilityChange}
                        />
                      }
                      label="Public"
                    />
                  </div>
                </FormControl>
              </div>
            </Grid>
            {/* HOW TO INVITE PEOPLE IN SESSION */}
            <Grid item lg={6} xs={12}>
              <div className="flex-col">
                <div className=" flex gap-1 text-gray-600 font-normal">
                  <div>Choice of invitation</div>
                  <div></div>
                  <Tooltip title="How do you want to invite your audience?">
                    <div className=" cursor-pointer">
                      <HelpOutlineIcon fontSize="small" />
                    </div>
                  </Tooltip>
                </div>
                <FormControl>
                  <RadioGroup
                    className="text-gray-600 text-xs font-normal"
                    aria-labelledby="radio-buttons-invitation-choice"
                    name="row-radio-buttons-invitation-choice-group"
                    value={selectedChoiceOfInvitation}
                    onChange={handleSelectedChoiceOfInvitationChange}
                  >
                    {PARTICIPANT_INVITATION_OPTIONS.filter(
                      (option) => !option.disabled
                    ).map((option) => (
                      <div
                        className="text-gray-700 leading-tight line-clamp-2 text-xs font-normal mb-2"
                        key={option.id}
                      >
                        <FormControlLabel
                          className="app__anchor__block"
                          value={option.value}
                          control={<Radio />}
                          label={
                            <>
                              {option.text}&nbsp;{option.icon}
                            </>
                          }
                        />
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>
            {/* Custom Questions */}

            <Grid item xs={12}>
              <div className="flex gap-1">
                {questionairreIdentifier == null ||
                questionairreIdentifier == 0 ? (
                  <>
                    <button
                      onClick={handleQuestionClick}
                      title="Add custom questions"
                      className={`app__button app__button__block ${
                        customQuestionsToParticipants
                          ? "control__disabled__opaque"
                          : ""
                      }`}
                    >
                      {CUSTOM_QUESTION_OPTS.icons.AddQuestion}
                      Add Questionairre
                    </button>
                  </>
                ) : (
                  <div className="flex gap-1">
                    <button
                      onClick={handleQuestionClick}
                      title="Edit custom questions"
                      className={`app__button app__button__block ${
                        customQuestionsToParticipants
                          ? "control__disabled__opaque"
                          : ""
                      }`}
                    >
                      {CUSTOM_QUESTION_OPTS.icons.EditQuestion}
                      Edit Questionairre
                    </button>
                    {questionairre && (
                      <>
                        {" "}
                        <button
                          onClick={handleDeleteQuestionairreClick}
                          title="Remove custom questions"
                          className={`app__button app__button__block  
                  `}
                        >
                          {CUSTOM_QUESTION_OPTS.icons.DeleteQuestion}
                        </button>
                      </>
                    )}
                  </div>
                )}
                <Tooltip title="Pre Questionairre for your attendees before registration">
                  <div className=" cursor-pointer">
                    <HelpOutlineIcon fontSize="small" />
                  </div>
                </Tooltip>
              </div>
              {customQuestionsToParticipants && (
                <div id="custom-question-box">
                  <Questions
                    mode={
                      questionairreIdentifier && questionairreIdentifier > 0
                        ? "edit"
                        : "add"
                    }
                    data={
                      questionairreIdentifier && questionairreIdentifier > 0
                        ? questionairre
                        : null
                    }
                    onSave={onSaveQuestions}
                    onCancel={onCancelQuestions}
                  />
                </div>
              )}
            </Grid>
          </Grid>
        </Box>
     
      <ConfirmDialog
        theme="dark"
        isOpen={showDeleteQuestionairreConfirmDialog}
        confirmMessage="Delete Questionnaire?"
        dialogCloseRequest={handleConfirmDialogRequest}
        title="Confirmation"
      />
    </div>
  );
}

export default Participant;
