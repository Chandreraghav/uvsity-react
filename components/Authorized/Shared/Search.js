import React, { useCallback, useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { PLACEHOLDERS } from "../../../constants/userdata";
import MicNoneIcon from "@mui/icons-material/MicNone";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchResult from "./SearchResult";
import SearchService from "../../../pages/api/people/network/Search/SearchService";
import { _delay } from "../../../utils/utility";
function Search() {
  const [searchResults, setSearchResults] = useState(null)
  const [recent, setRecentlyStale] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const searchResultsRef = useRef(null)
  const debounce = (func, delay = 500) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, delay);
    };
  };

  const handleSearch = (value) => {
    value = value.trim();
    if (value) {
      SearchService.searchByKeywords(value).then((res) => {
        setShowSearchResults(true)
        setSearchResults(res.data)
      }).catch((err) => {
        setShowSearchResults(false)
        setSearchResults(null)
      }).finally(() => {
        setRecentlyStale(false)
      })
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimizedFn = useCallback(debounce(handleSearch, 1000), []);
  const handleFocus = async (e) => {
    if (!searchResults) return;
    await _delay(1000)
    setRecentlyStale(true)
    setShowSearchResults(true)
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [searchResultsRef]);
  const handleClick = (obj) => {
    setRecentlyStale(true)
    setShowSearchResults(false)
  }
  return (
    <>
      <div className={`  flex-1 mr-4 md:mr-2 xl:mr-2 lg:mr-2 `}>

        <Paper
          className="dark:bg-gray-dark bg-gray-100"
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            flex: 1,
          }}
        >
          <IconButton
            className="dark:text-gray-100  text-gray-dark"
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
          <InputBase
            inputProps={{
              "aria-label": "search uvsity",
            }}
            className={`dark:text-gray-100  text-gray-dark`}
            sx={{ ml: 1, flex: 1 }}
            placeholder={PLACEHOLDERS.SEARCH}
            onChange={(e) => optimizedFn(e.target.value)}
            onClick={handleFocus}
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

        {showSearchResults && searchResults && (<div ref={searchResultsRef}><SearchResult recent={recent} results={searchResults} onItemClick={handleClick} /></div>)}
      </div>

    </>
  );
}

export default Search;
