import { Checkbox, FormControl, FormControlLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Spacer from '../../../shared/Spacer';
import InfoIcon from "@mui/icons-material/Info";
import QuizIcon from "@mui/icons-material/Quiz";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EditIcon from "@mui/icons-material/Edit";
import { CUSTOM_QUESTION_OPTS } from '../../../../constants/questionairre';
import { COLOR_CODES } from '../../../../constants/constants';
import { THEME_MODES, useTheme } from '../../../../theme/ThemeProvider';
import { makeStyles } from "@material-ui/core/styles";
function QuestionairreDetail(props) {

    const [theme, _dispatch] = useTheme();
    const [isDark, setDark] = useState(theme.mode === THEME_MODES.DARK);

    const deepGray = COLOR_CODES.GRAY.DEEP;
    const lightGray = COLOR_CODES.GRAY.LIGHT
    const useStyles = makeStyles((theme) => ({
        paper: {
            "& .MuiMenu-paper": {
                backgroundColor: isDark ? COLOR_CODES.BLACK.DARK : "",
            }

        },
        root: {

            '& .MuiInputBase-root.Mui-disabled': {
                color: '#fff',

            }

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
        setDark(theme.mode === THEME_MODES.DARK);
      }, [theme])
    return (
        <>
            {props?.participant?.questions &&
                props?.participant?.questionairre && (
                    <div className=" mt-2 mb-2 flex flex-col gap-2 bg-gray-100 dark:bg-gray-950 px-4 p-4 rounded-lg border-1 border-spacing-2 shadow-md bg-repeat-round">
                        <div className="flex gap-1">
                            <QuizIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                            <Typography
                                variant="div"
                                className="  font-semibold line-clamp-1 text-md  leading-snug text-gray-600"
                            >
                                Questionairre:
                            </Typography>
                            <Tooltip title={CUSTOM_QUESTION_OPTS.helptext.text_1}>
                                <div className=" leading-3 font-semibold  text-xl text-gray-500 cursor-pointer">
                                    <HelpOutlineIcon fontSize="small" />
                                </div>
                            </Tooltip>
                            <div
                                className="flex mr-2 text-blue-600
           ml-auto app-anchor-block cursor-pointer"
                            >
                                <Tooltip title="Change">
                                    <EditIcon
                                        onClick={() => {
                                            props.onNavigate ? props.onNavigate(2) : null;
                                        }}
                                        fontSize="small"
                                        className=" leading-3 font-semibold  text-sm"
                                    />
                                </Tooltip>
                            </div>
                        </div>

                        <div className="flex gap-1 font-normal  text-sm leading-snug">
                            <Typography variant="subtitle" className="line-clamp-1">
                                <div className="first-letter:underline">
                                    {props?.participant?.questionairre?.description}
                                </div>
                            </Typography>
                        </div>

                        <div className=" overflow-auto max-h-52">
                            {props?.participant?.questionairre?.questions.map(
                                (q, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col p-2 border-l-2 border-dashed  border-separate border-spacing-1 dark:border-l-gray-500 border-l-gray-600 px-3"
                                    >
                                        <div className="flex gap-1">
                                            <div className="text-sm text-gray-800 dark:text-gray-500 font-semibold">
                                                Q{index + 1}.
                                            </div>
                                            <div className="text-sm flex gap-2 text-gray-800 dark:text-gray-500 font-semibold line-clamp-1">

                                                {q.question}
                                            </div>
                                            {q.optional && (

                                                <div className="text-xs   text-gray-600">
                                                    (optional)
                                                </div>


                                            )}
                                        </div>
                                        {q.answerTypeCode === 1 && (
                                            <TextField
                                                placeholder="Answer"
                                                variant="standard"
                                                label={<label className="dark:text-blue-800">Answer</label>}
                                                InputProps={{
                                                    readOnly: true,
                                                }}

                                                inputProps={{ className: classes.input }}
                                                className={classes.root}
                                            />
                                        )}

                                        {q.answerTypeCode === 2 && (
                                            <>
                                                <FormControl>
                                                    <RadioGroup
                                                        className="text-gray-600 text-xs font-normal"
                                                        aria-labelledby="radio-buttons"
                                                        name="row-radio-buttons-group"
                                                    >
                                                        <div className="flex">
                                                            {q.options.map((option) => (
                                                                <div
                                                                    className="  leading-tight text-xs font-normal "
                                                                    key={option}
                                                                >
                                                                    <FormControlLabel
                                                                        sx={{ "& .Mui-disabled": { color: isDark ? lightGray : 'inherit' } }}
                                                                        value={option}
                                                                        control={<Radio size="small" disabled />}
                                                                        label={<label className=" dark:text-gray-700 text-gray-800">{option}</label>}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </RadioGroup>
                                                </FormControl>
                                            </>
                                        )}

                                        {q.answerTypeCode === 3 && (
                                            <>
                                                <div className="flex">
                                                    {q.options.map((option) => (
                                                        <FormControlLabel
                                                            className="text-sm text-gray-700"
                                                            disabled
                                                            sx={{ "& .Mui-disabled": { color: isDark ? lightGray : "inherit" } }}
                                                            control={<Checkbox sx={{
                                                                "&:hover": {
                                                                    background: '#E01EE8',
                                                                    boxShadow: 3
                                                                },

                                                                color: isDark ? deepGray : "inherit"
                                                            }} size="small" />}
                                                            label={<label className=" dark:text-gray-700 text-gray-800">{option}</label>}
                                                            labelPlacement="end"
                                                            key={option}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}

                                        {q.answerTypeCode === 4 && (
                                            <>
                                                <div className="flex mt-1">
                                                    <FormControl
                                                        fullWidth={true}
                                                        variant="standard"
                                                        sx={{ marginBottom: 1 }}
                                                    >
                                                        <Select
                                                            name="dropdown-question"
                                                            labelId="dropdown-question-label"
                                                            id="dropdown-question"
                                                            value={q.options[0]}
                                                            placeholder="Choose answer"
                                                            fullWidth
                                                            inputProps={{
                                                                classes: {
                                                                    icon: classes.icon,
                                                                },
                                                            }}
                                                            variant="outlined"
                                                            className={classes.select}
                                                            MenuProps={{
                                                                className: classes.paper,
                                                            }}
                                                        >
                                                            {q.options?.map((option) => (
                                                                <MenuItem
                                                                    dense
                                                                    className={`${classes.menuItem}   block p-2`}

                                                                    key={option}
                                                                    disabled
                                                                    value={option}
                                                                >
                                                                    {option}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </>
                                        )}

                                        {q.answerTypeCode === 5 && (
                                            <>
                                                <div className="flex mt-1">
                                                    <FormControl
                                                        fullWidth={true}
                                                        variant="standard"
                                                        sx={{ marginBottom: 1 }}
                                                    >
                                                        <Select
                                                            fullWidth
                                                            multiple
                                                            input={
                                                                <OutlinedInput variant="standard" />
                                                            }
                                                            value={q.options}
                                                            variant="standard"
                                                            inputProps={{
                                                                classes: {
                                                                    icon: classes.icon,
                                                                },
                                                            }}
                                                            className={classes.select}
                                                            MenuProps={{
                                                                className: classes.paper,
                                                            }}
                                                        >
                                                            {q.options.map((option) => (
                                                                <MenuItem
                                                                    dense
                                                                    className={`${classes.menuItem}   block p-2`}

                                                                    key={option}
                                                                    value={option}
                                                                    disabled
                                                                >
                                                                    {option}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </>
                                        )}

                                        {q.answerTypeCode === 7 && (

                                            <>
                                                <Spacer />
                                                <Typography className=" text-gray-700 dark:text-gray-500 leading-tight " variant="caption">
                                                    <InfoIcon size="small" />
                                                    A calendar will be available when answering this question.
                                                </Typography></>


                                        )}

                                        {q.answerTypeCode === 1 && (
                                            <Tooltip title="Maximum length of field">
                                                <Typography className="cursor-pointer text-xs leading-tight text-gray-700 font-normal"> {q.maxLength}</Typography>

                                            </Tooltip>


                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
        </>
    )
}

export default QuestionairreDetail
