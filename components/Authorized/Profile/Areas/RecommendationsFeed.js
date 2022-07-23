import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { WORKFLOW_CODES } from "../../../../constants/workflow-codes";
import SnapProfile from "../../Network/People/Listing/Snap/Profile";
import NoData from "../../Shared/NoData";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ReadMore from "../../../shared/ReadMore";
import { getMode, THEME_MODES } from "../../../../theme/ThemeProvider";
function RecommendationsFeed(props) {
  const handleOnProfileView = (obj) => {
    if (props.consumeEvent) {
      props.consumeEvent(obj, "RecommendationsFeed");
    }
  };
  const recommendations = props?.recommendations;
  return recommendations && recommendations.length > 0 ? (
    <>
      <Box
        className="recommendations"
        sx={{ width: "100%", maxHeight: 200, overflow: "auto" }}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {recommendations?.map((_recommendation, index) => (
            <Grid key={index} item xs={12}>
              <div className="dark:text-gray-500  flex flex-col gap-2 mb-1">
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
               
                   
                   <QuestionAnswerIcon sx={{color:'blueviolet', fontSize:14}}/>  <ReadMore color={`${getMode()===THEME_MODES.DARK ? '':'text.secondary'}`}>{_recommendation.recommendation}</ReadMore>
                  
                </div>
              </div>
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
