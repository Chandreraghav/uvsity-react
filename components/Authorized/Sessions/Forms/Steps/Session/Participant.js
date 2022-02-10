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
import { PARTICIPANT_INVITATION_OPTIONS } from "../../../../../../constants/userdata";
import Questions from "../../../../../shared/Questionairre/Questions";
import { CUSTOM_QUESTION_OPTS } from "../../../../../../constants/questionairre";
function Participant(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemSelected, setItemSelected] = useState(false);
  const [customQuestionsToParticipants, setCustomQuestionsToParticipants] =
    useState(false);
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
  const onSaveQuestions = (data) => {};
  const onCancelQuestions = (data) => {
    setCustomQuestionsToParticipants(false);
  };
  const handleQuestionClick=()=>{
    setCustomQuestionsToParticipants(true);
  }

  return (
    <div className={`p-4`}>
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
                className={`py-1 px-1 mt-3 flex flex-col place-items-center gap-2 justify-center  border-0 bg-blue-300 shadow-sm bg-repeat-round rounded-lg  `}
              >
                <div className="text-md flex gap-2">
                  <CoPresentIcon />{" "}
                  <span className="text-md leading-snug font-semibold">
                    Your co-host will be
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
            <button
             onClick={handleQuestionClick}
              title="Add custom questions"
              className={`app__button app__button__block ${customQuestionsToParticipants?'control__disabled__opaque':''}`}
            >
              {CUSTOM_QUESTION_OPTS.icons.AddQuestion}
              Add Custom Questions
            </button>
            {customQuestionsToParticipants && (
              <>
                <Questions
                  onSave={onSaveQuestions}
                  onCancel={onCancelQuestions}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Participant;
