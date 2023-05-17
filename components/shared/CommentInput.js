import { useState } from 'react';
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { UVSityAvatar } from './UVSityAvatar';

export const CommentInput = ({
  userPic = '',
  userName = '',
  helperText = '',
  commentTrigerred,
  disabled = false,
  className = '',
  label = 'Add a comment'
}) => {
  const [comment, setComment] = useState('');

  const onCommentTrigger = () => {
    commentTrigerred(comment);
    setComment('');
  }

  return (
    <div className={`flex items-start ${className}`}>
      <UVSityAvatar src={userPic} name={userName} className="mr-2 avatar-xs" />
      <TextField
        autoFocus
        className="w-full"
        size="small"
        variant="outlined"
        label={label}
        value={comment}
        disabled={disabled} 
        helperText={helperText} 
        onChange={(event) =>  setComment(event.target.value || '')}
        InputProps={{
          endAdornment: <InputAdornment position="start">
            <IconButton
              aria-label="Send Comment"
              onClick={() => onCommentTrigger()}
              onMouseDown={(event) => event.preventDefault()}
            >
              {comment && <SendIcon fontSize="small" color="primary" />}
            </IconButton>
          </InputAdornment>
        }}
      />
    </div>
    
  )
}