import { Tooltip, Typography } from "@mui/material";

const TooltipIconAction = ({ title, onTooltipAction, children, className="" }) => {
  return (
    <Tooltip title={title} className={`cursor-pointer ${className}`} onClick={() => onTooltipAction && onTooltipAction()}>
      <Typography 
        className="hover:bg-blue-800 hover:dark:text-gray-300 hover:text-gray-100 dark:text-gray-500 hover:font-bold text-gray-700 w-max p-2" 
        variant="caption"
      >
        {children}
      </Typography>
    </Tooltip>
  )
};

export default TooltipIconAction;