import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Profile from "../../Network/People/Dashboard/Profile";

function RecommendationsFeed(props) {
  const recommendations = props?.recommendations;
  return recommendations && recommendations.length > 0 ? (
    <>
      <Box className="recommendations" sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {recommendations?.map((_recommendation, index) => (
            <Grid key={index} item xs={12}>
              <div className="flex flex-col gap-2">
                <div>
                  <Profile
                    oid={_recommendation.recommendationFromUserDetailsId}
                    options={{ connect: false, mixedMode: false }}
                    firstName={_recommendation.recommendationFromFirstName}
                    lastName={_recommendation.recommendationFromLastName}
                    avatar={null}
                    userType={_recommendation.recommendationFromUserType}
                    instituition={
                      _recommendation.recommendationFromEducationalInstitution
                    }
                    origin={'recommendation_feed'}
                    noCardOnHover
                  />
                </div>
                <div className="-mt-4 text-sm">
                <Typography
                  classname=""
                  variant="div"
                  color="text.secondary"
                >
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
