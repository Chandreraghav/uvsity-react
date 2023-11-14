import React from 'react';
import { useRouter } from "next/router";
import { Tooltip } from '@mui/material';
import { ME, TOOLTIPS } from '../../../constants';
import { useDataLayerContextValue } from '../../../context';
import ProfileStyle from "../../../styles/DashboardProfile.module.css";
import { navigateToProfile } from './Navigator';

export const NameTooltip = ({ userId, children }) => {
  const router = useRouter();
  const [ctxUserdata] = useDataLayerContextValue();
  const isItMe = ctxUserdata?.userdata?.userDetailsId === userId;

  const handleUserClick = (event) => {
    event.stopPropagation();
    navigateToProfile && navigateToProfile(userId, router);
  };

  return (
    <Tooltip
      title={
        isItMe
          ? TOOLTIPS.GO_TO_PROFILE
          : TOOLTIPS.VIEW_PROFILE
      }
    >
      <a className={`font-bold ${ProfileStyle.profile__name}  `} onClick={(event) => handleUserClick(event)}>{children}{isItMe ? ME : <></>}</a>
    </Tooltip>
  )
}