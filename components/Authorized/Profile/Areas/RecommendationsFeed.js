import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { WORKFLOW_CODES } from "../../../../constants/workflow-codes";
import UserDataService from "../../../../pages/api/users/data/UserDataService";
import SnapProfile from "../../Network/People/Listing/Snap/Profile";
import NoData from "../../Shared/NoData";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ReadMore from "../../../shared/ReadMore";
import HelpIcon from "@mui/icons-material/Help";
import {
  getMode,
  THEME_MODES,
  useTheme,
} from "../../../../theme/ThemeProvider";
import { PLACEHOLDERS } from "../../../../constants/userdata";
function RecommendationsFeed(props) {
  const [theme, dispatch] = useTheme();
  const [isDark, setDark] = useState(theme.mode === THEME_MODES.DARK);
  const useStyles = makeStyles((theme) => ({
    switch_track: {
      backgroundColor: isDark ? "lightgray" : "grey",
    },
    switch_base: {
      color: isDark ? "lightgray" : "grey",
      "&.Mui-disabled": {
        color: "#e886a9",
      },
      "&.Mui-checked": {
        color: "#95cc97",
      },
      "&.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "#4CAF50",
      },
    },
    switch_primary: {
      "&.Mui-checked": {
        color: "#4CAF50",
      },
      "&.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "#4CAF50",
      },
    },
  }));
  const classes = useStyles();
  const handleOnProfileView = (obj) => {
    if (props.consumeEvent) {
      props.consumeEvent(obj, "RecommendationsFeed");
    }
  };
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (props?.owner && props?.userAcceptedRecommendations) {
      const tempRecommendations = [];
      props?.userAcceptedRecommendations?.map((_recommendation) => {
        const obj = {
          recommendation:
            _recommendation.recommendationResponse?.recommendation
              ?.recommendation,
          recommendationFromCampus:
            _recommendation?.recommendationResponse?.responseFrom?.campus,
          recommendationFromEducationalInstitution:
            _recommendation?.recommendationResponse?.responseFrom
              ?.educationalInstitution,
          recommendationFromUserType:
            _recommendation?.recommendationResponse?.responseFrom?.userBaseType,
          recommendationFromLastName:
            _recommendation?.recommendationResponse?.responseFrom?.lastName,
          recommendationFromMiddleName:
            _recommendation?.recommendationResponse?.responseFrom?.middleName,
          recommendationFromFirstName:
            _recommendation?.recommendationResponse?.responseFrom?.firstName,
          recommendationFromUserDetailsId:
            _recommendation?.recommendationResponse?.responseFrom
              ?.userDetailsId,
          processing: false,
          recommendationObj: _recommendation,
        };
        tempRecommendations.push(obj);
      });
      if (tempRecommendations.length > 0)
        setRecommendations(tempRecommendations);
    } else {
      setRecommendations(props?.recommendations);
    }
    return () => {
      setRecommendations([]);
    };
  }, [
    props?.userAcceptedRecommendations,
    props?.owner,
    props.recommendation,
    props?.recommendations,
  ]);
  useEffect(() => {
    setDark(theme.mode === THEME_MODES.DARK);
  }, [theme]);
  const toggleRecommendationCommentVisibility = (event, index) => {
    const tempRecommendations = recommendations.slice();
    if (index !== -1) {
      setRecommendations((prevArray) =>
        prevArray.map((obj, i) =>
          i === index ? { ...obj, processing: true, recommendationObj: { isRecommendationRequiredForDisplayOnProfile: event.target.checked } } : obj
        )
      );
      const payload = [];
      tempRecommendations.map((_recommendation) => {
        payload.push(_recommendation.recommendationObj);
      });
      if (payload.length > 0) {
        UserDataService.changeUserAcceptedRecommendationsPrivacy(payload)
          .then((result) => {
            setRecommendations((prevArray) =>
              prevArray.map((obj, i) =>
                i === index ? { ...obj, processing: false } : obj
              )
            );
          })
          .catch((err) => {
            setRecommendations((prevArray) =>
              prevArray.map((obj, i) =>
                i === index ? { ...obj, processing: false, recommendationObj: { isRecommendationRequiredForDisplayOnProfile: !event.target.checked } } : obj
              )
            );
          });
      } else {
        setRecommendations((prevArray) =>
          prevArray.map((obj, i) =>
            i === index ? { ...obj, processing: false, recommendationObj: { isRecommendationRequiredForDisplayOnProfile: !event.target.checked } } : obj
          )
        );
      }
    }
  };

  return recommendations && recommendations.length > 0 ? (
    <>
      <Box
        className="recommendations"
        sx={{ width: "100%" }}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {recommendations?.map((_recommendation, index) => (
            <Grid key={index} item xs={12}>
              <div className="flex">
                <div className=" dark:text-gray-500 flex flex-col gap-2 mb-1">
                  <div>
                    <SnapProfile
                      onProfileViewRequest={handleOnProfileView}
                      origin={"recommendation_feed"}
                      firstName={_recommendation.recommendationFromFirstName}
                      lastName={_recommendation.recommendationFromLastName}
                      oid={_recommendation.recommendationFromUserDetailsId}
                      userType={_recommendation.recommendationFromUserType}
                      instituition={
                        _recommendation.recommendationFromEducationalInstitution
                      }
                    />
                  </div>

                  <div className="dark:text-gray-500 text-gray-700   ml-10 text-sm">
                    <QuestionAnswerIcon
                      sx={{ color: "blueviolet", fontSize: 14 }}
                    />{" "}
                    <ReadMore
                      color={`${getMode() === THEME_MODES.DARK ? "" : "text.secondary"
                        }`}
                    >
                      {_recommendation.recommendation}
                    </ReadMore>
                  </div>
                </div>
              </div>

              {props?.owner && (
                <div className="flex">
                  <div></div>
                  <div className="show-hide-comment-switch ml-auto">
                    {_recommendation?.processing === true ? (
                      <>
                        <div className="flex text-sm text-muted leading-tight gap-1 dark:text-gray-500 text-gray-700">
                          <CircularProgress color="primary" size={15} />
                          <Typography variant="caption">
                            {PLACEHOLDERS.PROCESSING}
                          </Typography>
                        </div>
                      </>
                    ) : (
                      <FormControl variant="filled">
                        <FormControlLabel
                          label={
                            <>
                              <Typography
                                className=" text-sm  dark: text-gray-600 text-gray-800 "
                                variant="caption"
                              >
                                {_recommendation?.recommendationObj
                                  ?.isRecommendationRequiredForDisplayOnProfile ===
                                  true
                                  ? "Everyone"
                                  : "Private"}
                                &nbsp;
                                <Tooltip
                                  title={`${_recommendation?.recommendationObj
                                      ?.isRecommendationRequiredForDisplayOnProfile ===
                                      true
                                      ? "This recommendation will be shown to everyone who visits your profile. To make it Private, turn it off."
                                      : "Only you can see this recommendation. To make it visible for Everyone, turn it on."
                                    }`}
                                >
                                  <HelpIcon fontSize="small" />
                                </Tooltip>
                              </Typography>
                            </>
                          }
                          control={
                            <Switch
                              classes={{
                                track: classes.switch_track,
                                switchBase: classes.switch_base,
                                colorPrimary: classes.switch_primary,
                              }}
                              name="toggleRecommendationComment"
                              id="toggleRecommendationComment"
                              size="small"
                              onChange={(event) =>
                                toggleRecommendationCommentVisibility(
                                  event,
                                  index
                                )
                              }
                              checked={
                                _recommendation?.recommendationObj
                                  ?.isRecommendationRequiredForDisplayOnProfile === true
                              }
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                        />
                      </FormControl>
                    )}
                  </div>
                </div>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  ) : (
    <NoData message="No recommendations received yet." />
  );
}

export default RecommendationsFeed;
