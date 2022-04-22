import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { WORKFLOW_CODES } from "../../../../constants/workflow-codes";
import SnapProfile from "../../Network/People/Listing/Snap/Profile";

function RecommendationsFeed(props) {
  const handleOnProfileView=(obj)=>{
    if(props.consumeEvent){
      props.consumeEvent(obj, "RecommendationsFeed")
    }
  }
  const recommendations = props?.recommendations;
  return recommendations && recommendations.length > 0 ? (
    <>
      <Box className="recommendations" sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {recommendations?.map((_recommendation, index) => (
            <Grid key={index} item xs={12}>
              <div className="flex flex-col gap-2">
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
                <div className="  text-sm">
                  <Typography classname="" variant="div" color="text.secondary">
                    {_recommendation.recommendation}
                  </Typography>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  ) : (
    <>No data</>
  );
}

export default RecommendationsFeed;
