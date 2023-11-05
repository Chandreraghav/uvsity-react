import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react'
import { formattedName, formattedProfileSubtitle, getTimezone, localTZDate, shouldDialogAppearInFullScreen } from '../../../utils/utility';
import { THEME_MODES, useTheme } from '../../../theme/ThemeProvider';
import { navigateToProfile, navigateToSessionProfile } from '../../Authorized/Shared';
import { useRouter } from 'next/router';
import { COLOR_CODES, ME, TOOLTIPS } from '../../../constants';
import { useDataLayerContextValue } from '../../../context';
import Rating from '@mui/material/Rating';
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@material-ui/core/styles";
import ReviewSessionForm from '../../Authorized/Sessions/Forms/ReviewSessionForm';
import EmailSessionForm from '../../Authorized/Sessions/Forms/EmailSessionAuthorForm';

function SessionReviewDialog({
    isOpen,
    type,
    dialogCloseRequest,
    data
}) {
    const [reviewSubmitted, setReviewSubmitted] = useState(false)
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
    }));
    const classes = useStyles();
    const router = useRouter();
    const [context, dispatch] = useDataLayerContextValue();
    const userdata = useMemo(() => context?.logged_in_info, [context?.logged_in_info]);
    const isItMe = useMemo(() => {
        const user_id = data?.userDetailsId || data?.creator?.userDetailsId;
        return user_id === userdata?.userDetailsId;
    }, [data?.creator?.userDetailsId, data?.userDetailsId, userdata?.userDetailsId])

    const dialogTitle = useMemo(() => {
        let jsx = [];
        if (data) {
            const profilePrimaryLine = formattedName(
                data.creator.firstName,
                data.creator.lastName
            );
            const profileSecondaryLine = formattedProfileSubtitle(
                data.creator.userType,
                data.creator.educationalInstitute
            );
            const profileTertiaryLine = localTZDate(data.displayStartDate);
            jsx.push(
                <>
                    <div className="flex flex-col py-1 mb-1 gap-1">
                        <div className="flex gap-1 text-sm">
                            <div className="">by</div>
                            <Tooltip
                                title={
                                    isItMe ? TOOLTIPS.GO_TO_PROFILE : TOOLTIPS.VIEW_PROFILE
                                }
                            >
                                <div
                                    onClick={() => goToProfile()}
                                    className="line-clamp-1 cursor-pointer app-anchor-block"
                                >
                                    {profilePrimaryLine}
                                    {isItMe && <>{ME}</>}
                                </div>
                            </Tooltip>
                            {profileSecondaryLine && (
                                <div className="-mt-0.3 text-gray-500">&#8739;</div>
                            )}
                            <div className="line-clamp-1">{profileSecondaryLine}</div>
                        </div>

                        <div className="flex gap-1 text-gray-700  dark:text-gray-400 text-xs">
                            <div className="">on</div>
                            <div
                                className="line-clamp-1 "
                                title={`${profileTertiaryLine}(${getTimezone()})`}
                            >
                                {profileTertiaryLine}({getTimezone()})
                            </div>
                        </div>
                    </div>
                </>
            );
            return jsx;
        }
        return <></>
    }, [data, goToProfile, isItMe])
    if (!data || isOpen === undefined) {
        return <></>;
    }

    const handleClose = () => {
        if (dialogCloseRequest) dialogCloseRequest();
        setReviewSubmitted(false)
    };
    const goToSession = () => {
        const session_id = data?.courseId;
        navigateToSessionProfile(Number(session_id), router)
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const goToProfile = () => {
        const user_id = data?.userDetailsId || data?.creator?.userDetailsId;
        navigateToProfile(user_id, router);
    };

    const handleSubmit = () => {
        setReviewSubmitted(true)
    }

    const handleError = () => {
        setReviewSubmitted(false)
    }

    return (

        <Dialog
            fullScreen={shouldDialogAppearInFullScreen()}
            open={isOpen}
            aria-labelledby="responsive-dialog-title"
            onClose={handleClose}
            disableEscapeKeyDown
        >
            <DialogTitle
                sx={{
                    backgroundColor: isDark ? "#111" : "#fff",
                    color: isDark ? "#fff" : "#111",
                }}
            >
                <div className={`flex justify-between `}>
                    <div className={`  leading-tight  text-left font-bold flex-col`}>
                        <Typography
                            className={`dialog-title line-clamp-1`}
                            gutterBottom
                            variant="h6"
                            component="div"
                        >

                            <Tooltip
                                title={data?.courseFullName}
                            >
                                <div onClick={goToSession} >{data?.courseFullName}</div>
                            </Tooltip>



                        </Typography>
                        {dialogTitle && <div>{dialogTitle}
                        </div>}

                    </div>
                    <div className="ml-auto">
                        <Tooltip title="close">
                            <div>
                                {handleClose ? (
                                    <IconButton
                                        aria-label="close"
                                        onClick={handleClose}
                                        sx={{ color: `${isDark ? COLOR_CODES.GRAY.DEEP : ""}` }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                ) : null}
                            </div>
                        </Tooltip>
                    </div>
                </div>

            </DialogTitle>
            <DialogContent
                sx={{
                    backgroundColor: isDark ? "#111" : "#fff",
                    color: isDark ? "#fff" : "#111",
                }}
                className={`dialog-content`}>

                {type === 'Review' && (<ReviewSessionForm actionDone={handleClose} actionTriggered={reviewSubmitted} onError={handleError} data={data} />)}
                {type === 'Message' && (<EmailSessionForm actionDone={handleClose} actionTriggered={reviewSubmitted} onError={handleError} data={data} />)}

            </DialogContent>
            <DialogActions sx={{
                backgroundColor: isDark ? "#111" : "#fff",
                color: isDark ? "#fff" : "#111",
            }}>
                <Button disabled={reviewSubmitted === true} onClick={handleSubmit} variant="contained" type="submit"  >
                    {type === 'Review' ? 'Review now' : 'Send message'}
                </Button>
                <Button disabled={reviewSubmitted === true} variant="contained" onClick={handleClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>

    );
}

export default SessionReviewDialog