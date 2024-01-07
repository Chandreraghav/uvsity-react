import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    Typography,
    Tooltip,
    IconButton
} from "@mui/material";
import {
    isSmallScreen,
} from "../../../utils/utility";
import InterestsIcon from "@mui/icons-material/Interests";
import { getMode, THEME_MODES } from "../../../theme/ThemeProvider";
import { AREAS_OF_INTERESTS, COLOR_CODES } from "../../../constants/constants";
import DialogContent from '@mui/material/DialogContent';
import Chip from '@mui/material/Chip';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from "@mui/icons-material/Close";

function AreasOfInterestModal(props) {
    const [areasOfInterest, setAreasOfInterest] = useState(AREAS_OF_INTERESTS)
    const [processing, setProcessing] = useState(false);
    useEffect(() => {
        if (props.isOpen === true)
            setProcessing(false)
    }, [props]);
    if (!props.isOpen) return "";

    const isDark = getMode() === THEME_MODES.DARK;

    const handleClose = (closeInd, skip = false) => {
        if (props?.dialogCloseRequest) {
            if (!closeInd) {
                setProcessing(true);
            }
            props.dialogCloseRequest({
                selectedAreasOfInterest: closeInd ? [] : areasOfInterest.filter((obj) => obj.selected === true),
                skip
            });

        }
    };
    const handleInterestClick = (event, interest) => {
        setAreasOfInterest((prevArray) =>
            prevArray.map((obj) =>
                obj.id === interest.id ? { ...obj, selected: !interest.selected } : obj
            )
        );
    }
    const isEligibileForNextStep = () => {
        const selectedAreas = areasOfInterest.filter((obj) => obj.selected === true)
        if (selectedAreas.length < 3) return true
        return false
    }
    const _isSmallScreen = isSmallScreen();
    return (
        <Dialog open={props.isOpen} onClose={handleClose}
            maxWidth="md"
            PaperProps={{ style: { backgroundColor: isDark ? '#000' : '#fff' } }}
            fullWidth
            fullScreen={true}
            className={`${processing ? "control__disabled" : ""}`}
            aria-labelledby="responsive-dialog-title"
            disableEscapeKeyDown
        >
            <DialogTitle>
                <div className="flex justify-between">
                    <Typography
                        className="line-clamp-1"
                        gutterBottom
                        variant={_isSmallScreen ? "subtitle1" : "h6"}
                        component="div"
                    >
                        <InterestsIcon className=" dark:text-gray-300" />
                        <span className=" dark:text-gray-300">Choose up to 3 of your interests</span>
                    </Typography>

                    <Tooltip title="close">
                        {handleClose ? (
                            <IconButton
                                aria-label="close"
                                onClick={() => handleClose(false, true)}
                                sx={{

                                    color: `${isDark ? COLOR_CODES.GRAY.DEEP : ""}`,
                                }}
                                className={`${processing ? 'opacity-50' : ''}`}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        ) : null}
                    </Tooltip>
                </div>
            </DialogTitle>
            <DialogContent dividers style={{ overflowY: 'auto', maxHeight: '82vh' }}>
                <div className="flex flex-wrap gap-3 p-2 h-full">
                    {areasOfInterest.map((interest) => (
                        <Chip className={` transition-all ease-in-out duration-150 dark:text-gray-300 ${!interest.selected ? 'dark:bg-gray-700 dark:hover:bg-gray-900' : ''} `} color={interest.selected === true ? 'success' : 'default'} onClick={(event) => handleInterestClick(event, interest)} key={interest.id} label={`${interest.emoji} ${interest.label}`} />
                    ))}
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    className={`${processing ? 'opacity-50' : ''}`}
                    variant={isDark ? 'contained' : 'outlined'}
                    onClick={() => handleClose(false)}
                    autoFocus
                    disabled={isEligibileForNextStep()}
                >
                    {!processing ? "Next" : "Profiling..."}
                </Button>
                <Button
                    color="secondary"
                    onClick={() => handleClose(true, true)}
                    className={`${processing ? 'opacity-50' : ''}`}
                >
                    Skip
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AreasOfInterestModal