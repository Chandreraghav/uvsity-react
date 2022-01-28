import React, { useState, useEffect } from "react";
import ProfileCompletionDetailStyle from "../../../styles/ProfileCompletionDetail.module.css";
import { useDataLayerContextValue } from "../../../context/DataLayer";
import { AuthGuardService } from "../../../auth-guard/service/AuthGuardService";
import CompletionProgress from "./CompletionProgress";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  COMPLETION_DETAIL_ACTION,
  getProfileCompletionTexts,
} from "../../../constants/userdata";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import Tooltip from "@mui/material/Tooltip";
import { TOOLTIPS } from "../../../constants/userdata";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import {
  RESPONSE_TYPES,
  RESPONSE_TYPES_COLOR,
} from "../../../constants/constants";
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
import Spacer from "../../shared/Spacer";
function CompletionDetail() {
  const [USERDATA, dispatch] = useDataLayerContextValue();
  const [suggestionShowed, setSuggestionShown] = useState(false)
  const [completionTextObject, setCompletionTextObject] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const toggleSuggestions=(e)=>{
    setSuggestionShown(!suggestionShowed)
  }
  useEffect(() => {
    setLoggedIn(AuthGuardService.isUserLoggedIn());
  }, []);
  useEffect(() => {
    setCompletionTextObject(
      getProfileCompletionTexts(USERDATA?.PROFILE_PERCENTAGE_COMPLETION?.data)
    );
  }, [USERDATA]);
  if (!loggedIn) {
    return "";
  }
  const getRGBColor=()=>{
    if (completionTextObject.alertLevel === RESPONSE_TYPES.SUCCESS) {
      return RESPONSE_TYPES_COLOR.SUCCESS.rgb;
    }
    if (completionTextObject.alertLevel === RESPONSE_TYPES.INFO) {
      return RESPONSE_TYPES_COLOR.INFO.rgb;
    }
    if (completionTextObject.alertLevel === RESPONSE_TYPES.WARNING) {
      return RESPONSE_TYPES_COLOR.WARNING.rgb;
    }
    if (completionTextObject.alertLevel === RESPONSE_TYPES.ERROR) {
      return RESPONSE_TYPES_COLOR.ERROR.rgb;
    }
  }
  const getColor = () => {
    if (completionTextObject.alertLevel === RESPONSE_TYPES.SUCCESS) {
      return RESPONSE_TYPES_COLOR.SUCCESS.hex;
    }
    if (completionTextObject.alertLevel === RESPONSE_TYPES.INFO) {
      return RESPONSE_TYPES_COLOR.INFO.hex;
    }
    if (completionTextObject.alertLevel === RESPONSE_TYPES.WARNING) {
      return RESPONSE_TYPES_COLOR.WARNING.hex;
    }
    if (completionTextObject.alertLevel === RESPONSE_TYPES.ERROR) {
      return RESPONSE_TYPES_COLOR.ERROR.hex;
    }
  };

  const getIcon = () => {
    if (completionTextObject.alertLevel === RESPONSE_TYPES.SUCCESS) {
      return <CheckOutlinedIcon/>
    }
    if (completionTextObject.alertLevel === RESPONSE_TYPES.INFO) {
      return <ThumbUpOutlinedIcon/>
    }
    if (completionTextObject.alertLevel === RESPONSE_TYPES.WARNING) {
      return <BoltOutlinedIcon/>
    }
    if (completionTextObject.alertLevel === RESPONSE_TYPES.ERROR) {
      return <WarningOutlinedIcon/>
    }
  };
  return (
    <div>
     <Spacer count={2}/>
    <div style={{borderBottom: `5px solid ${getColor()}`}} className={` uvsity__card`}>
      <div
        className={
          ProfileCompletionDetailStyle.profile__completion__detail__card
        }
      >
        <div
          className={
            ProfileCompletionDetailStyle.profile__completion__detail__graph
          }
        >
          <CompletionProgress
            color={getRGBColor()}
            percentage={
              USERDATA?.PROFILE_PERCENTAGE_COMPLETION?.data
                ?.percentageOfProfileAlreadyCompleted
            }
          />
        </div>

        <div>
          <Typography
            className={
              `text-center ${ProfileCompletionDetailStyle.profile__completion__detail__header__text}`
            }
            gutterBottom
            variant="h5"
            component="div"
          >
            {getIcon()}{' '}{completionTextObject.headerText}
          </Typography>
          <div className=' flex'>
          <Typography className={
                ProfileCompletionDetailStyle.profile__completion__detail__explanation__text
              } variant="body2" color="text.secondary">
            {completionTextObject.icon} {completionTextObject.guidanceText}
          </Typography>
          </div>

          {completionTextObject.needsWork && (
            <div
             
              className={` items-center
                    ${ProfileCompletionDetailStyle.profile__completion__detail__suggestions}`
                  }
            >
              <Tooltip title={TOOLTIPS.VIEW_SUGGESTIONS}>
                <SettingsSuggestOutlinedIcon onClick={(e)=> toggleSuggestions()}
                  className={`
                    ${ProfileCompletionDetailStyle.profile__completion__detail__suggestion__icon}`
                  }
                />
              </Tooltip>
              { suggestionShowed && completionTextObject?.recommendedSteps.map((reco)=>(
                <div className={ProfileCompletionDetailStyle.profile__completion__detail__guidance__text}>
                  
                  <DoubleArrowOutlinedIcon/>&nbsp;{reco}</div>
              ))}
            </div>
          )}
        </div>
        <div className=" items-baseline p-2">
        <Spacer/>
          {COMPLETION_DETAIL_ACTION.map((action) => (
            
            <Tooltip key={action.id} title={action.tooltip}>
              {action.startIcon ? (
                <Button startIcon={action.icon} size={action.size}>
                  {action.title}
                </Button>
              ) : (
                <Button endIcon={action.icon} size={action.size}>
                  {action.title}
                </Button>
              )}
            </Tooltip>
            
          ))}
             
        </div>
     
      </div>
    </div>
    </div>
  );
}

export default CompletionDetail;
