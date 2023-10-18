import React from "react";

const MessageTypeItem = ({ type, text, icon: Icon, className = '', onActiveItemChange, currentActive }) => {
  return (
    <div 
      className={
        `flex w-full h-8 items-center cursor-pointer rounded-full px-2
          hover:bg-blue-200 hover:dark:text-green hover:font-bold hover:dark:font-normal
          ${currentActive === type ? 'bg-blue-200 dark:text-green font-bold dark:font-normal' : ''}
          ${className}
        `
      }
      onClick={() => onActiveItemChange(type)}
    >
      <Icon />
      <div className="ml-1">{text}</div>
    </div>
  );
}

export default MessageTypeItem;
