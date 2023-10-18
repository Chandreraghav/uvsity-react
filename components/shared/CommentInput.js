import { useState, useMemo } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from '../../theme';
import { UVSityAvatar } from './UVSityAvatar';
import { THEME_MODES, getMode } from '../../theme/ThemeProvider';
import { COLOR_CODES, SESSION_COMMENTS } from '../../constants';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import InfoIcon from "@mui/icons-material/Info"
export const CommentInput = ({
  userPic = '',
  userName = '',
  helperText = '',
  commentTrigerred,
  disabled = false,
  className = '',
  label = SESSION_COMMENTS.ADD_COMMENT
}) => {
  const [theme] = useTheme();

  const StyledTextField = useMemo(() => {
    const mainColor = theme?.mode === THEME_MODES.DARK ? DeepGray : ''
    
    return withStyles({
      root: {
        "& label": {
          color: mainColor
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: mainColor
        },
        "& .MuiOutlinedInput-root": {
          color: mainColor,
          "& fieldset": {
            borderColor: mainColor
          },
          "&:hover fieldset": {
            borderColor: mainColor
          }
        }
      }
    })(TextField);
  }, [theme]);

  const [comment, setComment] = useState('');
  const isDark = getMode() === THEME_MODES.DARK;
  const deepGray= COLOR_CODES.GRAY.DEEP
  const useStyles = makeStyles({
    root: {
      "& .MuiFormLabel-root": {
        color: isDark ? deepGray : "", // or black
      },
     
    },
    input: {
      color: isDark?deepGray:'',
      borderBottom: `1px solid ${isDark ? deepGray : "none"}`,
      "&:focus":{
        borderBottom:'none'
      }
    }
  });
  const classes = useStyles();

  const validComment = comment.trim();

  const onCommentTrigger = (event) => {
    event.preventDefault();
    if(validComment) {
      commentTrigerred(validComment);
      setComment('');
    }
  };

  return (
    <form className={`flex items-start ${className}`} onSubmit={(event) => onCommentTrigger(event)}>
      <UVSityAvatar src={userPic} name={userName} className="mr-2 avatar-xs mt-3" />
      <TextField
        autoFocus
        size="small"
        variant="standard"
        label={<Typography variant="subtitle1" className="dark:text-gray-500 text-gray-600">{label}</Typography>}
        value={comment}
        disabled={disabled} 
        helperText={helperText ? <Typography variant="caption" className="dark:text-gray-600 text-gray-700"><InfoIcon/>{helperText}</Typography> : <></>} 
        onChange={(event) =>  setComment(event.target.value || '')}
        className={`w-full ${classes.root}`}
            inputProps={{ className: classes.input }}
        InputProps={
          {
          endAdornment: <InputAdornment position="start">
            <IconButton
              type="submit"
              ariaLabel={SESSION_COMMENTS.SEND_COMMENT}
            >
              {validComment && <SendIcon fontSize="small" color="primary" />}
            </IconButton>
          </InputAdornment>,
          className: classes.input
        }  }
      />
    </form>
    
  )
}