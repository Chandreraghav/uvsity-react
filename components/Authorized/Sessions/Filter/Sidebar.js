import React, { useEffect, useRef, useState } from 'react'
import Spacer from '../../../shared/Spacer'
import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { THEME_MODES, useTheme } from '../../../../theme/ThemeProvider';
import { makeStyles } from "@material-ui/core/styles"
import { COLOR_CODES } from '../../../../constants';
import debounce from 'lodash/debounce';
import SessionService from '../../../../pages/api/session/SessionService';
import SearchService from '../../../../pages/api/people/network/Search/SearchService';
function Sidebar(props) {
    const [filters, setFilters] = useState({
        sessionName: '',
        keyword: '',
        sessionsBy: '',
    })
    const inputRef = useRef(null); // Reference to the SessionsBy TextField
    const [suggestionClicked, setSuggestionClicked] = useState(false); // Flag to track suggestion clicks

    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([])
    const handleInputChange = (field, value) => {
        setFilters({ ...filters, [field]: value });
        setSuggestionClicked(false);
    };
    const handleClearFilters = () => {
        setFilters({
            sessionName: '',
            keyword: '',
            sessionsBy: '',
        });
        props.onResetEvent()
    };
    const handleSubmit = () => {
        let payload = {}
        const sessionTutor = filters.sessionsBy
        if (sessionTutor) {
            const sessionTutorNamedArray = sessionTutor.split(' ')
            const firstName = sessionTutorNamedArray[0]
            const lastName = sessionTutorNamedArray[1] || undefined

            payload = {
                "typeStr": "NameAndKeyWord",
                "courseName": filters.sessionName,
                "keyWords": filters.keyword,
                "firstName": firstName,
                "lastName": lastName
            }
        }


        else {
            payload = {
                "typeStr": "NameAndKeyWord",
                "courseName": filters.sessionName,
                "keyWords": filters.keyword,

            }
        }
        SessionService.searchSessions(payload).then((res) => {
            if (res.data && res.data instanceof Array && res.data.length > 0) {
                props.onDataEvent(res.data)
            }
            else {
                props.onDataEvent([])
            }

        })
    };


    const [isSticky, setSticky] = useState(false);
    const [ctxTheme, dispatch] = useTheme();
    const [isDark, setDark] = useState(ctxTheme.mode === THEME_MODES.DARK);
    const deepGray = COLOR_CODES.GRAY.DEEP;
    const lightGray = COLOR_CODES.GRAY.LIGHT;
    useEffect(() => {
        setDark(ctxTheme.mode === THEME_MODES.DARK);
    }, [ctxTheme]);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            const scrollheightLimit = 200;
            if (window.scrollY > scrollheightLimit) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        });
        return () => {
            try {
                window.removeEventListener("scroll");
            } catch (error) { }
        };
    }, []);
    const useStyles = makeStyles((theme) => ({
        FormControl: {
            "& .MuiFormControl-root": {
                borderColor: 'red'
            }
        },

        root: {
            "& .MuiInputBase-root": {
                "&:hover": {
                    borderBottom: isDark ? `1px solid ${deepGray}` : "none",
                },
                "&.Mui-focused": {
                    borderBottom: "none",
                },
            },
            "& .MuiFormLabel-root": {
                color: isDark ? deepGray : "inherit",
            },
            "&:focus": {
                borderBottom: "none",
            },
        },
        paper: {
            "& .MuiMenu-paper": {
                backgroundColor: isDark ? COLOR_CODES.BLACK.DARK : "",
            },

        },
        select: {
            color: isDark ? deepGray : "",
            borderBottom: isDark ? `1px solid ${lightGray}` : "",
            "&:before": {
                borderBottom: isDark ? `1px solid ${lightGray}` : "",
            },
        },
        icon: {
            fill: isDark ? deepGray : "inherit",
        },
        disabledInput: {
            "& .MuiFormLabel-root": {
                color: isDark ? deepGray : "inherit",
            },
            '& .MuiInputBase-root.Mui-disabled>input': {
                '-webkit-text-fill-color': isDark ? deepGray : "inherit",
            },
            borderBottom: isDark ? `1px solid ${deepGray}` : "none",
            "&:focus": {
                borderBottom: "none",
            },
        },
        input: {
            color: isDark ? deepGray : "inherit",
            borderBottom: isDark ? `1px solid ${deepGray}` : "none",
            "&:focus": {
                borderBottom: "none",
            },
        },
        menuItem: {
            backgroundColor: isDark ? COLOR_CODES.BLACK.DARK : "",
            color: isDark ? deepGray : "",
            "&.Mui-selected": {
                backgroundColor: isDark ? COLOR_CODES.BLUE.DARK : "",
                color: isDark ? deepGray : "",
                fontWeight: 600,
            },
            "&:hover": {
                backgroundColor: isDark ? `${COLOR_CODES.BLUE.LIGHT}!important` : "",
            },
        },
        multiLineRoot: {
            "& .MuiInputBase-root": {
                "&:hover": {
                    borderBottom: "none",
                },
                "&.Mui-focused": {
                    borderBottom: "none",
                },
            },
            "& .MuiFormLabel-root": {
                color: isDark ? deepGray : "inherit",
            },
            "&:focus": {
                borderBottom: "none",
            },
        },
    }));

    const classes = useStyles();
    const fetchSessions = (query) => {
        if (!suggestionClicked) {
            setLoading(true);
            const val = query.trim()
            if (val &&
                val !== "") {
                SearchService.searchPeopleAsSessionTutorsByPeopleName(val).then((res) => {
                    setSearchResults(res.data)
                    setLoading(false);
                }).catch((error) => {
                    setSearchResults([])
                    setLoading(false);
                })
            }
        }
    }
    const debouncedFetchSessionsBy = debounce(fetchSessions, 300);
    useEffect(() => {
        if (filters.sessionsBy) {
            debouncedFetchSessionsBy(filters.sessionsBy)
        } else {
            setSearchResults([])
        }
    }, [filters.sessionsBy]);

    useEffect(() => {
        const handleDocumentClick = (e) => {
            // Check if the click is outside the SessionsBy TextField
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setSearchResults([]); // Close the suggestions
                setSuggestionClicked(false); // Reset the flag when suggestions are closed

            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const handleSuggestionClick = (suggestion) => {
        setFilters({ ...filters, sessionsBy: suggestion });
        setSearchResults([]); // Close the suggestions
        setLoading(false)
        setSuggestionClicked(true); // Set the flag to true when a suggestion is clicked

    };
    return (
        <div className={`px-4  ${isSticky
            ? "md:sticky  lg:sticky  xl:sticky top-12  "
            : ""
            }`}>
            <Spacer count={isSticky ? 8 : 2} />
            <div
                className={`uvsity__card  uvsity__card__border__theme `}
            >
                <Typography className="dark:text-gray-200 flex  text-gray-900" variant="subtitle2">
                    <FilterAltIcon />
                    <p className="first-letter:underline"> Refine Results</p>  </Typography>
                <Spacer />

                <div className='mb-4'>
                    <div className='flex flex-col py-2 gap-4'>

                        <TextField
                            variant='standard'
                            inputProps={{ className: classes.input }}
                            className={classes.root}
                            fullWidth
                            label="Session Name"
                            value={filters.sessionName}
                            onChange={(e) => handleInputChange('sessionName', e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Keyword"
                            variant='standard'
                            inputProps={{ className: classes.input }}
                            className={classes.root}
                            value={filters.keyword}
                            onChange={(e) => handleInputChange('keyword', e.target.value)}
                        />
                        <TextField
                            fullWidth
                            variant='standard'
                            InputProps={{
                                className: classes.input, endAdornment: loading ? <div><CircularProgress /></div> : null,
                            }}
                            className={classes.root}
                            label="Sessions By"
                            value={filters.sessionsBy}
                            inputRef={inputRef} // Attach the ref to the input field
                            onChange={(e) => handleInputChange('sessionsBy', e.target.value)}
                        />
                        {searchResults.length > 0 && (
                            <div
                                className={`w-1/2 bg-gradient-to-r from-gray-950 to-[#558ee1] text-gray-500  pb-2 pt-2 absolute z-[999px] px-2  max-h-48 overflow-y-auto`}
                            >
                                {searchResults?.map((searchResult, idx) => (
                                    <div onClick={() => handleSuggestionClick(searchResult)} className={`cursor-pointer p-2 hover:font-bold hover:text-white-100`} key={idx}>
                                        {searchResult}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <Spacer count={2} />
                    <div className=" flex gap-2 px-2">
                        <Button variant="contained" onClick={handleSubmit}>
                            Apply
                        </Button>
                        <Button variant="contained" onClick={handleClearFilters}>
                            Clear Filter
                        </Button>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default Sidebar