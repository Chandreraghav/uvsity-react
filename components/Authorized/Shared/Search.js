import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { PLACEHOLDERS } from "../../../constants/userdata";
import SearchStyle  from '../../../styles/Search.module.css'
function Search() {
  return (
    <div className={SearchStyle.search}>
      <SearchIcon />
      <input placeholder={PLACEHOLDERS.SEARCH} type="text" className="" />
    </div>
  );
}

export default Search;
