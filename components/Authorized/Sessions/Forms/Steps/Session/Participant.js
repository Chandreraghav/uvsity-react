import { Box, FormControl, FormHelperText, Grid, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
import Profile from "../../../../Network/People/Listing/Search/Profile";
import SearchService from "../../../../../../pages/api/people/network/Search/SearchService";
import SnapProfile from "../../../../Network/People/Listing/Snap/Profile";
import UserDataService from "../../../../../../pages/api/users/data/UserDataService";
import { useQuery } from "react-query";
import { KEYS } from "../../../../../../async/queries/keys/unique-keys";
import DeleteIcon from "@mui/icons-material/Delete";
function Participant(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemSelected, setItemSelected] = useState(false);
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

  return (
    <div className={`p-4`}>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={6}>
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
                className={`py-1 px-1 mt-3 flex gap-5 justify-center  border-0 bg-blue-300 shadow-sm bg-repeat-round rounded-lg  `}
              >
                <h3 className="mt-2 text-sm leading-tight font-semibold italic">
                  Your co-host will be
                </h3>
                <SnapProfile
                  firstName={selectedItem.firstName}
                  lastName={selectedItem.lastName}
                  avatar={selectedItem.profilepicName}
                  userType={selectedItem.userType}
                  instituition={selectedItem.eduIns}
                  oid={selectedItem.userDetailsId}
                  userdata={USER_LOGIN_INFO?.data}
                />
                <div>
                  <Tooltip title="Remove co-host">
                    <DeleteIcon
                      onClick={handleRemoveParticipant}
                      size="small"
                      className="app__anchor__block cursor-pointer"
                    />
                  </Tooltip>
                </div>
              </div>
            )}

            {searchResults.length > 0 && (
              <div
                className={`${
                  itemSelected ? "control__disabled__opaque" : ""
                } z-auto  flex flex-col gap-2 pb-2 shadow-xl overflow-y-auto  bg-transparent`}
              >
                {searchResults.map((searchResult) => (
                  <Profile
                    onSelect={handleSelect}
                    key={searchResult.entityId}
                    data={searchResult}
                  />
                ))}
              </div>
            )}
          </Grid>

          <Grid item xs={6}>
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
              />
               <FormHelperText
                    className="blue-text leading-tight -ml-1 font-semibold"
                     
                  >
                    For 100+ participants, premium membership is required.
                  </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            How do you want your session to be:
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Participant;
