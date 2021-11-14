import React, { useState, useEffect } from "react";
import ProfileCompletionDetailStyle from "../../../styles/ProfileCompletionDetail.module.css";
import { useDataLayerContextValue } from "../../../context/DataLayer";
import { AuthGuardService } from "../../../auth-guard/service/AuthGuardService";
import CompletionProgress from "./CompletionProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import {
  COMPLETION_DETAIL_ACTION,
  getProfileCompletionTexts,
} from "../../../constants/userdata";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import Tooltip from "@mui/material/Tooltip";
import { TOOLTIPS } from "../../../constants/userdata";
import {
  RESPONSE_TYPES,
  RESPONSE_TYPES_COLOR,
} from "../../../constants/constants";
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
  return (
    <div className={ProfileCompletionDetailStyle.profile__completion__detail}>
      <Card
        className={
          ProfileCompletionDetailStyle.profile__completion__detail__card
        }
        sx={{ maxWidth: 345, borderBottom: `5px solid ${getColor()}` }}
      >
        <Box
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
        </Box>

        <CardContent>
          <Typography
            className={
              ProfileCompletionDetailStyle.profile__completion__detail__header__text
            }
            gutterBottom
            variant="h5"
            component="div"
          >
            {completionTextObject.headerText}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {completionTextObject.icon} {completionTextObject.guidanceText}
          </Typography>

          {completionTextObject.needsWork && (
            <div
              className={
                ProfileCompletionDetailStyle.profile__completion__detail__suggestions
              }
            >
              <Tooltip title={TOOLTIPS.VIEW_SUGGESTIONS}>
                <SettingsSuggestOutlinedIcon onClick={(e)=> toggleSuggestions()}
                  className={
                    ProfileCompletionDetailStyle.profile__completion__detail__suggestion__icon
                  }
                />
              </Tooltip>
              { suggestionShowed && completionTextObject?.recommendedSteps.map((reco)=>(
                <div className={ProfileCompletionDetailStyle.profile__completion__detail__guidance__text}>
                  
                  ➡️&nbsp;{reco}</div>
              ))}
            </div>
          )}
        </CardContent>
        <CardActions>
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
        </CardActions>
      </Card>
    </div>
  );
}

export default CompletionDetail;
