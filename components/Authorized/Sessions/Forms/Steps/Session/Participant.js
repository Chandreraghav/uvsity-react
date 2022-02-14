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
import React, { useState } from "react";
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
import { SESSION_ERROR } from "../../../../../../constants/error-messages";
toast.configure();
function Participant(props) {
  const [processing, setProcessing] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
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
        setSelectedItem(res.data);
        setQuery("");
      })
      .catch(() => {
        setSelectedItem(null);
      })
      .finally(() => {
        setSearchResults([]);
        setQuery("");
        setItemSelected(false);
      });
  };
  const handleRemoveParticipant = () => {
    setSelectedItem(null);
    setSelectedItems([]);
    setQuery("");
    setItemSelected(false);
  };
  const onSaveQuestions = (data) => {
    setQuestionairreIdentifier(data);
    setCustomQuestionsToParticipants(false);
  };
  const onCancelQuestions = (data) => {
    setCustomQuestionsToParticipants(false);
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
            setCustomQuestionsToParticipants(false);
            setQuestionairre(null);
            setProcessing(false);
            setQuestionairreIdentifier(null);
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
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  return (
    <div className={`p-4 ${processing ? "control__disabled__opaque" : ""}`}>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
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
                id="expected-number"
                type="number"
                required
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 3);
                }}
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
                <div>Session visibility</div>
                <Tooltip title="How do you want your session to be, public or private?">
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
                        checked={true}
                        inputProps={{ "aria-label": "controlled" }}
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
                  value={0}
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
