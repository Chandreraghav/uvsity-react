import React from "react";
import Chip from '@mui/material/Chip';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { NameTooltip } from '../../../Shared';

const NameCard = ({ uiData }) => {
  const { userInfo, requestToUserDetailsId, date, requestTypeText, body, isAccepted, isPending, isApprovalRequired } = uiData || {};
  const { name, profession, city, country, educationalInstitution} = userInfo;
  const chipColor = !isApprovalRequired || isPending ? 'primary' : isAccepted ? 'success' : 'error';

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex text-sm leading-snug flex-col">
          <div><NameTooltip userId={requestToUserDetailsId}>{name}</NameTooltip></div>
          <span className="text-gray-700 dark:text-gray-600 text-xs">
            {educationalInstitution}
          </span>
          <span className="text-gray-700 dark:text-gray-600 text-xs">
            {profession} {city && `, ${city}`} {country && `, ${country}`}
          </span>
          <span className="text-gray-700 dark:text-gray-600 text-xs mt-2">
            <b>Request:</b> {body}
          </span>
          <div><Chip className="mt-2" label={requestTypeText} size="small" color={chipColor} /></div>
        </div>
        <div className="flex text-sm leading-snug items-start">
          <span className="text-gray-700 dark:text-gray-600 text-xs mr-2">
            {date}
          </span>
          <DeleteOutlineOutlinedIcon className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default NameCard;
