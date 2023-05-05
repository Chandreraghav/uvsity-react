import { useMemo } from 'react';
import { Avatar } from "@mui/material";
import { USER_PROFILE } from '../../constants';
import { getAbbreviatedWord, stringToColor } from '../../utils';

export const UVSityAvatar = ({
  src, name = `${USER_PROFILE.ANONYMOUS} ${USER_PROFILE.ANONYMOUS}`, className = ''
}) => {
  const {avatarAbbreviatedName, bgColor } = useMemo(() => { 
    return {
      avatarAbbreviatedName: getAbbreviatedWord(name),
      bgColor:  stringToColor(name)
    }
  }, [name]);


  return (
    <Avatar
      className={className}
      src={src || ''}
      alt={name}
      sx={!src ? { bgcolor: bgColor } : undefined}
    >{!src && avatarAbbreviatedName }</Avatar>
  )
}