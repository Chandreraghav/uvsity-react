import { UVSityAvatar } from '../../shared';
import ProfileStyle from "../../../styles/DashboardProfile.module.css";

export const Comment = ({ 
  comment,
  userName,
  userDetailsId,
  userPic,
  userProfession,
  commentTime,
  replies,
  className = '',
  onUserNameClick 
}) => {
  const onUserClick = (event) => {
    event.preventDefault();
    onUserNameClick && onUserNameClick(userDetailsId);
  };

  return (
    <div className={`${className} flex items-start`}>
      <UVSityAvatar src={userPic} name={userName} className="mr-2 avatar-xs" />
      <div className="w-full">
        <div className="bg-gray-200 dark:bg-gray-dark rounded-md p-2">
          <div className="flex justify-between text-sm leading-snug">
            <a className={`font-bold ${ProfileStyle.profile__name}  `} onClick={(event) => onUserClick(event)}>{userName}</a>
            <span className="sm:line-clamp-1 text-gray-700 dark:text-gray-600 text-xs">{commentTime}</span>
          </div>
          <span className="sm:line-clamp-1   text-xs text-gray-700 dark:text-gray-600">{userProfession}</span>
          <p className="mt-2 dark:text-gray-500  text-gray-800">{comment}</p>
        </div>
        {replies !== undefined && <div className="pl-2 pt-2 sm:line-clamp-1 text-gray-700 dark:text-gray-600 text-xs">{replies?.length || 0} replies</div>}
        { !!replies?.length && 
          replies.map((eachReply) => (
            <Comment className="mt-2" key={eachReply.id} {...eachReply} />
          ))
        }
      </div>
    </div>
  );
};
