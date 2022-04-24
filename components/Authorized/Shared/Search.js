import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { PLACEHOLDERS } from "../../../constants/userdata";
import MicNoneIcon from "@mui/icons-material/MicNone";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

function Search() {
  return (
    <>
      <div className={` flex-1 mr-4 md:mr-2 xl:mr-2 lg:mr-2 `}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            flex:1
             
          }}
        >
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={PLACEHOLDERS.SEARCH}
            inputProps={{ "aria-label": "search uvsity" }}
          />

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="mic-search"
          >
            <MicNoneIcon />
          </IconButton>
        </Paper>
      </div>
      
    </>
  );
}

export default Search;
