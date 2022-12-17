import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { COLOR_CODES } from '../../../../../constants/constants';
import { THEME_MODES, useTheme } from '../../../../../theme/ThemeProvider';
import { makeStyles } from "@material-ui/core/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getLocalStorageObject } from '../../../../../localStorage/local-storage';
import AppButton from '../../../../shared/AppButton';
import BoltIcon from '@mui/icons-material/Bolt';
import { isValidYear } from '../../../../../utils/utility';
import CommonSearchService from '../../../../../pages/api/search/CommonSearchService';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function FilterForm(props) {
    const [theme, dispatch] = useTheme();
    const [isDark, setDark] = useState(theme.mode === THEME_MODES.DARK);
    const countries = JSON.parse(getLocalStorageObject("uvsity-countries"));
    const deepGray = COLOR_CODES.GRAY.DEEP;
    const lightGray = COLOR_CODES.GRAY.LIGHT
    const [filterDirty, setFilterDirty] = useState(false)
    const filteredEduInsRef = useRef(null);
    const [educationInstitution, setEducationInstitution] = useState(null)
    const [campus, setCampus] = useState(null)
    const [specialization, setSpecialization] = useState(null)
    const [filteredEduIns, setFilteredEducationalInstituitons] = useState([]);
    let filterTimeout;
    const [fromYear, setFromYearChange] = useState(
        null
    );
    const [toYear, setToYearChange] = useState(
        null
    );
    const selected_country = countries.find(
        (country) =>
            country.countryFullName.toLowerCase() ===
            props?.data?.country.toLowerCase()
    );

    const [country, setCountry] = useState(
        selected_country?.countryFullName
    );

    const [countryId, setCountryId] = useState(
        selected_country?.countryId.toString() || ""
    );
    const [city, setCity] = useState(null)
    useEffect(() => {
        setDark(theme.mode === THEME_MODES.DARK);
    }, [theme]);

    const useStyles = makeStyles((theme) => ({
        paper: {
            "& .MuiMenu-paper": {
                backgroundColor: isDark ? COLOR_CODES.BLACK.DARK : "",
            }

        },
        root: {
            "& .MuiInputBase-root": {
                "&:hover": {
                    borderBottom: `${isDark ? `1px solid ${deepGray}` : "none"}`,
                },
                "&.Mui-focused": {
                    borderBottom: "none",
                },
            },

            "& .MuiFormLabel-root": {
                color: isDark ? deepGray : "inherit", // or black
            },

            "&:focus": {
                borderBottom: "none",
            },
        },
        input: {
            color: isDark ? deepGray : "inherit",
            borderBottom: ` ${isDark ? `1px solid ${deepGray}` : "none"}`,
            "&:focus": {
                borderBottom: "none",
            },
        },
        formControl: {
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottom: `${isDark ? `1px solid ${deepGray}` : ""}`,
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
    const debounce = (func, delay) => {
        let debounceTimer;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    };
    const handleCampusChange = (e) => {
        const value = (e.target.value).trim() || ""
        setCampus(value)
        if (value !== "") {
          
            if (!filterDirty)
                setFilterDirty(true)
        }

    }
    const handleCityChange = (e) => {
        const value = (e.target.value).trim() || ""
        setCity(value)
        if (value !== "") {
           
            if (!filterDirty)
                setFilterDirty(true)
        }
    }
    const handleCountryChange = (e) => {
        setCountryId(e.target.value);
        const idx = countries.findIndex(
            (country) => country.countryId === e.target.value
        );
        if (idx !== -1) setCountry(countries[idx].countryFullName);

    };
    const handleSpecialization = (e) => {
        const value = (e.target.value).trim() || ""
        setSpecialization(value)
        if (value !== "") {
            if (!filterDirty)
                setFilterDirty(true)
        }
    }
    const handleEducationInstitutionChange = (e) => {
        const value = (e.target.value).trim() || ""
        setEducationInstitution(value)
        if (value !== "") {
            clearTimeout(filterTimeout);
            if (!e.target.value) {
                setFilteredEducationalInstituitons([]);
                return;
            }
            // debounce filter for educational institution by 1 second
            if (e.target.value) {
                filterTimeout = setTimeout(() => {
                    CommonSearchService.searchEduIns(e.target.value)
                        .then((res) => {
                            if (res.data) setFilteredEducationalInstituitons(res.data);
                            else setFilteredEducationalInstituitons([]);
                        })
                        .catch(() => {
                            setFilteredEducationalInstituitons([]);
                        }).finally(() => {
                            if (!filterDirty)
                                setFilterDirty(true)
                        })
                }, 1000);
            }

        }
    }

    const handleEducationInstitutionSelect = (event, eduInsName) => {
        setEducationInstitution(eduInsName);
        setFilteredEducationalInstituitons([]);
        if (!filterDirty)
            setFilterDirty(true)
    };
    const handleFilterSubmit = (obj) => {
        if (obj) {
            // check if atleast one field is dirty
            if (!filterDirty) {
                return;
            }
            if (props.onApplyFilter) {
                const data = {
                    "educationalInstitutionFullName": educationInstitution,
                    "specialization": specialization,
                    "educationalInstitutionCampus": campus,
                    "countryFullName": country,
                    "cityFullName": city
                }
                props.onApplyFilter(data)
            }
        }

    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                filteredEduInsRef.current &&
                !filteredEduInsRef.current.contains(event.target)
            ) {
                setFilteredEducationalInstituitons([]);
            }
        };
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [filteredEduIns]);
    return (
        <Box className='p-2' sx={{ width: "100%" }}>
            <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            >

                <Grid item xs={12}>
                    <FormControl
                        fullWidth={true}
                        variant="standard"
                        sx={{ marginBottom: 1 }}
                    >
                        <TextField
                            placeholder="Type and suggestions may show up..."
                            variant="standard"
                            value={educationInstitution}
                            name="educationInstitution"
                            label={
                                <label className=" text-blue-800">
                                    University/College/School
                                </label>
                            }
                            onChange={(e) => debounce(handleEducationInstitutionChange(e), 500)}
                            inputProps={{ className: classes.input, style: { fontSize: 12 } }}
                            className={classes.root}
                            id="educationInstitution"

                        />
                    </FormControl>
                    {filteredEduIns.length > 0 && (
                        <Grid
                            ref={filteredEduInsRef}
                            item
                            lg={6}
                            md={6}
                            sm={12}
                            xs={12}
                        >
                            <div className=" absolute z-50  bg-gray-400 rounded-lg dark:bg-gray-dark eduins-search-result-container max-h-40  overflow-auto will-change-auto ">
                                {filteredEduIns.map((orgz, idx) => (
                                    <div
                                        onClick={(event) =>
                                            handleEducationInstitutionSelect(
                                                event,
                                                orgz.educationalInstitutionFullName
                                            )
                                        }
                                        key={idx}
                                        className=" text-gray-dark text-ellipsis hover:text-white-100 hover:bg-gray-700  hover:dark:bg-gray-200 dark:text-gray-400 hover:dark:text-gray-800     hover:font-semibold cursor-pointer p-2 text-sm max-w-sm  "
                                    >
                                        <Typography variant="subtitle2">
                                            {orgz.educationalInstitutionFullName}
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        </Grid>
                    )}
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                    {/* From Year */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            autoOk
                            inputFormat="YYYY"
                            views={["year"]}
                            label={<label className=" text-blue-800">From</label>}
                            renderInput={(params) =>
                                theme.mode === THEME_MODES.DARK ? (
                                    <TextField
                                        margin="dense"
                                        fullWidth
                                        sx={{
                                            svg: { color: `${deepGray}` },
                                            input: {
                                                color: "#fff",
                                                borderBottom: `1px solid ${deepGray}`,
                                            },
                                        }}
                                        variant="standard"
                                        id="fromDate"
                                        name="fromDate"
                                        {...params}
                                    />
                                ) : (
                                    <TextField
                                        format="MMMM,YYYY"
                                        margin="dense"
                                        fullWidth
                                        sx={{
                                            svg: { color: `#696969` },
                                            input: {
                                                color: "#696969",
                                                borderBottom: "1px solid none",
                                            },
                                        }}
                                        variant="standard"
                                        id="fromDate"
                                        name="fromDate"
                                        {...params}
                                    />
                                )
                            }

                            value={fromYear}
                            onChange={(newvalue) => {
                                if (isValidYear(newvalue.$y
                                )) {
                                    setFromYearChange(newvalue);
                                    if (!filterDirty && newvalue)
                                        setFilterDirty(true)
                                }
                            }}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                    {/* To Year */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            autoOk
                            inputFormat="YYYY"
                            views={["year"]}
                            label={<label className=" text-blue-800">To</label>}
                            renderInput={(params) =>
                                theme.mode === THEME_MODES.DARK ? (
                                    <TextField
                                        margin="dense"
                                        fullWidth
                                        sx={{
                                            svg: { color: `${deepGray}` },
                                            input: {
                                                color: "#fff",
                                                borderBottom: `1px solid ${deepGray}`,
                                            },
                                        }}
                                        variant="standard"
                                        id="toDate"
                                        name="toDate"
                                        {...params}
                                    />
                                ) : (
                                    <TextField
                                        format="MMMM,YYYY"
                                        margin="dense"
                                        fullWidth
                                        sx={{
                                            svg: { color: `#696969` },
                                            input: {
                                                color: "#696969",
                                                borderBottom: "1px solid none",
                                            },
                                        }}
                                        variant="standard"
                                        id="toDate"
                                        name="toDate"
                                        {...params}
                                    />
                                )
                            }

                            value={toYear}
                            onChange={(newvalue) => {
                                if (isValidYear(newvalue.$y
                                )) {
                                    setToYearChange(newvalue);
                                    if (!filterDirty && newvalue)
                                        setFilterDirty(true)
                                }
                            }}

                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                    <FormControl
                        fullWidth={true}
                        variant="standard"
                        sx={{ marginBottom: 1 }}
                    >
                        <TextField
                            placeholder="Search using specialization or session..."
                            variant="standard"
                            value={specialization}
                            onChange={(e) => debounce(handleSpecialization(e), 500)}
                            name="specialization"
                            label={
                                <label className=" text-blue-800">
                                    Specialization/Session
                                </label>
                            }
                            inputProps={{ className: classes.input, style: { fontSize: 12 } }}
                            className={classes.root}
                            id="specialization"

                        />
                    </FormControl>

                </Grid>


                <Grid item xs={12}>
                    <FormControl
                        fullWidth={true}
                        variant="standard"
                        sx={{ marginBottom: 1 }}
                    >
                        <TextField
                            placeholder="Search using campus name..."
                            variant="standard"
                            value={campus}
                            name="campus"
                            inputProps={{ className: classes.input, style: { fontSize: 12 } }}

                            className={classes.root}
                            onChange={(e) => debounce(handleCampusChange(e), 500)}
                            label={<label className=" text-blue-800">Campus</label>}
                            id="campus"
                        />
                    </FormControl>
                </Grid>


                <Grid item xs={12}>
                    {/* Country */}
                    <FormControl
                        fullWidth={true}
                        variant="standard"
                        sx={{ marginBottom: 1 }}
                        className={classes.formControl}
                    >
                        <InputLabel>
                            <label id="select-country-label" className={` text-blue-800 `}>Choose a country</label>
                        </InputLabel>
                        <Select
                            name="country"
                            labelId="select-country-label"
                            id="select-country"
                            value={countryId}
                            onChange={(e) => debounce(handleCountryChange(e), 500)}
                            required
                            label={<label className=" text-blue-800">Country</label>}
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                },
                            }}
                            MenuProps={{
                                className: classes.paper,
                            }}
                            className={classes.select}
                        >
                            {countries?.map((country) => (
                                <MenuItem
                                    className={`${classes.menuItem} block p-2`}
                                    key={country.countryId}
                                    value={country.countryId}
                                >
                                    {country.countryFullName}
                                </MenuItem>
                            ))}
                        </Select>

                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    {/* City */}
                    <FormControl
                        fullWidth={true}
                        variant="standard"
                        sx={{ marginBottom: 1 }}
                    >
                        <TextField
                            variant="standard"
                            value={city}
                            name="city"
                            onChange={(e) => debounce(handleCityChange(e), 500)}
                            label={<label className=" text-blue-800">City</label>}
                            inputProps={{ className: classes.input }}
                            className={classes.root}
                            id="city"
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <div className="flex space-x-2 py-2 justify-center">
                <AppButton icon={BoltIcon} ripple color={isDark ? THEME_MODES.DARK : THEME_MODES.LIGHT} label="Apply Filter" event={handleFilterSubmit} />
                <Tooltip title='Reset all filters'>
                <div role="button" className="mt-2 inline-block"><RestartAltIcon/></div>
                
                </Tooltip>
               

            </div>

        </Box>
    )
}

export default FilterForm