import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Rating, Divider } from '@mui/material';
import { useMemo } from 'react';
import { THEME_MODES, useTheme } from '../../../../theme/ThemeProvider';
import { makeStyles } from "@material-ui/core/styles";
import { COLOR_CODES, GENERIC_INTERNAL_ERROR, RESPONSE_TYPES } from '../../../../constants';
import SessionService from '../../../../pages/api/session/SessionService';
import { getWorkflowError } from "../../../../error-handler/handler";
import { handleResponse } from '../../../../toastr-response-handler/handler';
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SESSION } from '../../../../validation/services/auth/ValidationSchema';
import { isEmptyObject } from '../../../../utils/utility';
toast.configure();
function ReviewSessionForm(props) {
    const formOptions = {
        resolver: yupResolver(SESSION.SEND_REVIEW),
        mode: "all",
    };
    const { register, formState, watch, reset } = useForm(formOptions);
    const { errors } = formState;
    const { data, actionTriggered, actionDone, onError } = props;
    const courseId = useMemo(() => data.courseId, [data.courseId])
    const sessionAuthor = useMemo(() => data.creator.firstName, [data.creator.firstName]);
    const deepGray = COLOR_CODES.GRAY.DEEP;
    const [_theme, _dispatch] = useTheme();
    const isDark = useMemo(() => {
        return _theme.mode === THEME_MODES.DARK
    }, [_theme.mode])
    const useStyles = makeStyles((theme) => ({
        darkModeRating: {
            '& .MuiRating-iconEmpty': {

                color: isDark ? '#e2e2e2' : '', // Edge color in dark mode

            },
        },

        root: {
            "& .MuiFormLabel-root": {
                color: isDark ? deepGray : "", // or black
            },



        },
        input: {
            color: isDark ? deepGray : "",
            borderBottom: `1px solid ${isDark ? deepGray : "none"}`,
            "&:focus": {
                borderBottom: "none",
            },
        },


    }));
    const classes = useStyles();
    const [tutorsKnowledge, setTutorsKnowledge] = useState(0);
    const [sessionMaterial, setSessionMaterial] = useState(0);
    const [interaction, setInteraction] = useState(0);
    const [value, setValue] = useState(0);
    const [comments, setComments] = useState('');
    useEffect(() => {
        if (actionTriggered === true) {
            if (!isEmptyObject(errors)) {
                onError()
                handleResponse(
                    `☹️ There are one or more errors. Please review and try again.`,
                    RESPONSE_TYPES.WARNING,
                    toast.POSITION.BOTTOM_CENTER
                );

                return
            }
            const payload = {
                "courseId": courseId.toString(),
                "reviewCommentsString": comments,
                "noOfStars": ((tutorsKnowledge + sessionMaterial + interaction + value) / 4).toString(),

            }
            SessionService.sendSessionRatingAndReview(payload)
                .then((res) => {
                    actionDone()
                    handleResponse(
                        `👍Awesome, we've sent your review for '${data.courseFullName}' to ${sessionAuthor} `,
                        RESPONSE_TYPES.SUCCESS,
                        toast.POSITION.BOTTOM_CENTER
                    );
                }).catch((err) => {
                    actionDone()
                    handleResponse(
                        getWorkflowError(GENERIC_INTERNAL_ERROR),
                        RESPONSE_TYPES.ERROR,
                        toast.POSITION.BOTTOM_CENTER
                    );
                })

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actionTriggered])



    return (
        <div className=" max-h-64">
            <Typography variant="h6">Rate session</Typography>
            <Divider className=" border-b-indigo-500" />

            <Box display="flex" flexDirection="column" my={2}>
                {/* // eslint-disable-next-line react/no-unescaped-entities */}
                <Typography>{`Tutor's Knowledge:`}</Typography>
                <Rating
                    className={classes.darkModeRating}
                    name="tutorsKnowledge"
                    value={tutorsKnowledge}
                    onChange={(event, newValue) => setTutorsKnowledge(newValue)}
                />
            </Box>

            <Box display="flex" flexDirection="column" my={2}>
                <Typography>Session Material:</Typography>
                <Rating
                    className={classes.darkModeRating}
                    name="sessionMaterial"
                    value={sessionMaterial}
                    onChange={(event, newValue) => setSessionMaterial(newValue)}
                />
            </Box>


            <Box display="flex" flexDirection="column" my={2}>
                <Typography>Interaction:</Typography>
                <Rating
                    className={classes.darkModeRating}
                    name="interaction"
                    value={interaction}
                    onChange={(event, newValue) => setInteraction(newValue)}
                />
            </Box>

            <Box display="flex" flexDirection="column" my={2}>
                <Typography>Value:</Typography>
                <Rating
                    className={classes.darkModeRating}
                    name="value"
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                />
            </Box>

            <TextField
                variant="standard"
                label="Comments"
                multiline
                rows={4}
                fullWidth
                required
                value={comments}
                my={2}
                name="comments"
                id="comments"
                inputProps={{ className: classes.input }}
                className={classes.root}
                {...register(`comments`, {
                    onChange: (event) => {
                        setComments(event.target.value);
                    },
                })}
                helperText={errors.comments?.message}
                error={errors.comments?.message ? true : false}
            />


        </div>
    );
}

export default ReviewSessionForm;
