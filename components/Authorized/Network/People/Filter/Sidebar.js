import {  Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Spacer from '../../../../shared/Spacer'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { WORKFLOW_CODES } from '../../../../../constants/workflow-codes';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CONNECTIONS } from '../../../../../constants/userdata';
import { THEME_MODES, useTheme } from '../../../../../theme/ThemeProvider';
import { COLOR_CODES } from '../../../../../constants/constants';
import { makeStyles } from "@material-ui/core/styles"

function Sidebar(props) {
  const [isSticky, setSticky] = useState(false);
  const [ctxTheme, dispatch] = useTheme();
  const [isDark, setDark] = useState(ctxTheme.mode === THEME_MODES.DARK);
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
      } catch (error) {}
    };
  }, []);
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiSvgIcon-root":{
        fontSize: '1.4rem',
      }, 
    },

    disabled: {
      '& .Mui-disabled': {
        color: isDark?'grey':'inherit',
        
      },
    },
}));
  const classes = useStyles();
  return (
    <div className={`px-4  ${
      isSticky
        ? "md:sticky  lg:sticky  xl:sticky top-12  "
        : ""
    }`}>
      <Spacer count={3} />
      <div
        className={`uvsity__card  uvsity__card__border__theme `}
      >
          <Typography className="dark:text-gray-200 flex  text-gray-900" variant="subtitle2">
          <FilterAltIcon />
         <p className="first-letter:underline"> Refine Results</p>  </Typography>
        <Spacer />
         <>
          {CONNECTIONS.map((connection) => (<div
             className={`${connection.hidden?'cursor-not-allowed pointer-events-none':''} text-xs text-gray-800 dark:text-gray-500`} key={connection.id}>
            <FormControlLabel
              
              classes={{
                 root: classes.root,
                 label:classes.label,
                 disabled: classes.disabled
              }}
              sx={{ color:connection.hidden===true?'gray':'inherit'}}
               
              control={
                <Checkbox
                  
                sx={{
                  "&:hover": {
                    background:'#E01EE8',
                    boxShadow: 3
                  },
                  color:connection.hidden===true?'gray':'#0081CB'
                }}
                  // onChange={handleRepeatCheckChange}
                  // checked={repeatChecked}
                  size="small"
                   

                />
              }
              label={connection.title}
              labelPlacement="end"
            />
          </div>))}

More
        </>
      </div>
    </div>
  )
}

export default Sidebar