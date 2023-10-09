import { Button, Dialog, DialogActions } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import JoinFullIcon from "@mui/icons-material/JoinFull";
import { THEME_MODES, useTheme } from "../../../../theme/ThemeProvider";
import { COLOR_CODES } from "../../../../constants/constants";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
function PastSessionDialog({
  data,
  type,
  isOpen,
  getSelectedSession,
  dialogCloseRequest,
  title,
  theme,
  selectedSession
}) {
  
  const [pastSession, setPastSession] = useState();
  const [_theme, _dispatch] = useTheme();
  const [isDark, setDark] = useState(_theme.mode === THEME_MODES.DARK);
  const deepGray = COLOR_CODES.GRAY.DEEP;
  const lightGray= COLOR_CODES.GRAY.LIGHT
  const useStyles = makeStyles((theme) => ({
    
    paper:{
      "& .MuiMenu-paper":{
        backgroundColor: isDark ? COLOR_CODES.BLACK.DARK : "",
      }

    },
    root: {
      "& .MuiFormLabel-root": {
        color: isDark ? deepGray : "", // or black
      },
       


    },
    
    select: {
      color: isDark ? deepGray : "",

      "&:before": {
        borderBottom: ` ${isDark ? `1px solid ${lightGray}` : ""}`,
      },
    },
    icon: {
      fill: isDark ?deepGray : "inherit",
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
    setDark(_theme.mode === THEME_MODES.DARK);
  }, [_theme]);
  if (!isOpen) return "";

  
  const handleClose = () => {
    if (dialogCloseRequest) {
      dialogCloseRequest();
    }
  };
  const handlePastSessionChange = (e) => {
    setPastSession(e);
  };

  const handlePastSessionChangeTransfer = () => {
    if (getSelectedSession) {
      getSelectedSession(pastSession);
    }
    if (dialogCloseRequest) {
      dialogCloseRequest();
    }
  };
  return (
    <>
      <Dialog
        open={isOpen}
        fullWidth
        aria-labelledby="responsive-dialog-title"
        aria-describedby="responsive-dialog-description"
        onClose={() => handleClose()}
        disableEscapeKeyDown
      >
        <div className={`${isDark ? "dark-dialog" : ""}`}>
          <div className={` px-4 py-2 leading-tight  text-left flex-col`}>
            <div className="flex gap-1 font-semibold">
              <JoinFullIcon />
              <>
                <div className=" text-gray-600  mt-0">
                  {title || "Past session"}{" "}
                </div>
              </>
            </div>

            <Box sx={{ width: "100%" }}>
              <Grid item>
                <FormControl
                  fullWidth={true}
                  variant="standard"
                  sx={{ marginBottom: 1 }}
                >
                  <InputLabel  sx={{color: isDark ? deepGray : ""}} id="select-past-session-label">Choose</InputLabel>
                  <Select
                    fullWidth
                    onChange={handlePastSessionChange}
                    labelId="select-past-session-label"
                    id="select-past-session"
                    value={pastSession?.target?.value || selectedSession}
                    label="Choose"
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                    className={classes.select}
                    MenuProps={{
                      className:classes.paper,
                    }}
                  >
                    <MenuItem
                       dense
                       className={`${classes.menuItem}   block p-2`}
                      
                      value={0}
                    ></MenuItem>
                    {data &&
                      Object.values(data).map((session) => (
                        <MenuItem
                        dense
                       className={`${classes.menuItem}   block p-2`}
                      
                         
                          key={session.courseId}
                          value={session.courseId}
                        >
                          {session.courseFullName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Box>
          </div>
        </div>
        <DialogActions
        
        className={`${isDark ? "dark-dialog" : ""}`}>
        
          <>
            <Button
              disabled={pastSession === null}
              onClick={() => handlePastSessionChangeTransfer()}
              autoFocus
            >
              OK
            </Button>
            <Button onClick={() => handleClose()}>Cancel</Button>
          </>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PastSessionDialog;
