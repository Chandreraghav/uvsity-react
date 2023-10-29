import { Avatar } from "@mui/material";
import { USER_PROFILE } from '../../constants';
import { avatarToString } from '../../utils';

export const UVSityAvatar = ({
  src, name = `${USER_PROFILE.ANONYMOUS} ${USER_PROFILE.ANONYMOUS}`, className = ''
}) => {

  return (
    <Avatar
      className={className}
      src={src || ''}
      alt={name}
      {...avatarToString(`${name}`)}
    />
  )
}