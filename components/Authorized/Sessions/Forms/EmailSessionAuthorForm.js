import React, { useState, useMemo } from 'react';
import { Typography, TextField, MenuItem, Divider, Tooltip, Select, InputLabel, FormControl } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import HelpIcon from "@mui/icons-material/Help";
import Spacer from '../../../shared/Spacer';
import { COLOR_CODES, GENERIC_INTERNAL_ERROR, RESPONSE_TYPES, SESSION as _SESSION } from '../../../../constants';
import { THEME_MODES, useTheme } from '../../../../theme/ThemeProvider';
import { useEffect } from 'react';
import MessagingService from '../../../../pages/api/people/Messaging/MessageService';
import { useDataLayerContextValue } from '../../../../context';
import { getWorkflowError } from "../../../../error-handler/handler";
import { toast } from "react-toastify";
import { handleResponse } from '../../../../toastr-response-handler/handler';
import { useForm } from "react-hook-form";
import { SESSION } from '../../../../validation/services/auth/ValidationSchema';
import { isEmptyObject } from '../../../../utils/utility';
import { yupResolver } from "@hookform/resolvers/yup";
toast.configure();
const EmailSessionForm = (props) => {
    const formOptions = {
        resolver: yupResolver(SESSION.SEND_MESSAGE),
        mode: "all",
    };
    const { register, formState, watch, reset } = useForm(formOptions);
    const { errors } = formState;
    const { data, actionTriggered, actionDone, onError } = props;
    const [ctxUserdata, dispatch] = useDataLayerContextValue();
    const sessionAuthor = useMemo(() => data.creator.firstName, [data.creator.firstName]);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const usersInTo = useMemo(() => [data.creator.userDetailsId], [data.creator.userDetailsId])
    const userdata = useMemo(() => ctxUserdata.userdata, [ctxUserdata.userdata])
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
                "usersInTo": usersInTo,
                "messageSubject": subject,
                "messageBody": message,
                "isMailRequiredToBeSentToAdmin": true,
                "senderUserId": userdata.userDetailsId,
                "htmlFormattedMessageBody": null,
                "isMessageBodyHTMLFormatted": false,
                "usersInCc": null
            }
            MessagingService.sendMessage(payload).then((res) => {
                actionDone()
                handleResponse(
                    `📧 Superb, we've just sent your message to ${sessionAuthor} `,
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
    }, [actionTriggered, sessionAuthor, userdata.userDetailsId, usersInTo])


    const deepGray = COLOR_CODES.GRAY.DEEP;
    const lightGray = COLOR_CODES.GRAY.LIGHT;
    const [_theme, _dispatch] = useTheme();
    const isDark = useMemo(() => _theme.mode === THEME_MODES.DARK, [_theme.mode]);

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

    return (
        <div>
            <div className={'flex gap-1'}>
                <Typography variant="h6">Message {sessionAuthor}</Typography>
                <Tooltip arrow title={`You can message ${sessionAuthor} about this session.`}>
                    <HelpIcon className="text-gray-600" size="small" />
                </Tooltip>
            </div>

            <Divider className="border-b-indigo-500" />

            <TextField
                label="To:"
                defaultValue="Sarah SmithS"
                fullWidth
                disabled
                variant='standard'
                className={classes.disabledInput}
            />

            <TextField
                label="Cc:"
                defaultValue="Uvsity Admin"
                fullWidth
                disabled
                variant='standard'
                className={classes.disabledInput}
            />

            <Spacer />

            <FormControl required fullWidth>
                <InputLabel htmlFor="subject">
                    <label id="select-subject-label" className='dark:text-[#e2e2e2] text-gray-800'>Subject:</label>
                </InputLabel>

                <Select

                    fullWidth
                    labelId="select-subject-label"
                    name="subject"
                    id="subject"
                    value={subject}

                    {...register(`subject`, {
                        onChange: (event) => {
                            setSubject(event.target.value);
                        },
                    })}

                    error={errors.subject?.message ? true : false}
                    required
                    inputProps={{
                        classes: {
                            icon: classes.icon,
                        },
                    }}
                    MenuProps={{
                        className: classes.paper,
                    }}
                    className={classes.select}
                >{
                        _SESSION.EMAIL_SUBJECTS
                            .filter((subject) => subject.hidden === false)
                            .map((_subject, idx) => (
                                <MenuItem disabled={_subject.disabled} key={idx} className={`${classes.menuItem} block p-2`} value={_subject.subject}>
                                    {_subject.subject}
                                </MenuItem>
                            ))
                    }
                </Select>
                {errors.subject?.message && (<label style={{ fontFamily: 'Roboto' }} className=' text-[#d32f2f] text-left mt-[3px] mr-0 mb-0 ml-0 tracking-[0.03333em] font- font-normal text-xs leading-7'>{errors.subject.message}</label>)}

            </FormControl>

            <TextField
                label={<label id="message-label" className='dark:text-[#e2e2e2] text-gray-800'>Message:</label>}
                multiline
                required
                rows={4}
                fullWidth
                variant='standard'
                inputProps={{ className: classes.input }}
                id='message'
                name='message'
                {...register(`message`, {
                    onChange: (event) => {
                        setMessage(event.target.value);
                    },
                })}
                helperText={errors.message?.message}
                error={errors.message?.message ? true : false}
                className={classes.multiLineRoot}
            />
        </div>
    );
};

export default EmailSessionForm;
