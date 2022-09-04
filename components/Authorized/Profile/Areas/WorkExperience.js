import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, Tooltip } from "@mui/material";
import NoData from "../../Shared/NoData";
import { READ_MORE_MAX_LENGTH } from "../../../../constants/constants";
import { getMode, THEME_MODES } from "../../../../theme/ThemeProvider";
import ReadMore from "../../../shared/ReadMore";
import { USER_PROFILE } from "../../../../constants/userdata";
import { AddCircleOutlined } from "@mui/icons-material";
import { Edit } from "@material-ui/icons";
function WorkExperience(props) {
  const [experiences, setExperiences] = useState([]);
  useEffect(() => {
    setExperiences(props?.experiences);
    return () => setExperiences([]);
  }, [props?.experiences]);
  const getDurationOfexperience = (exp) => {
    let end = exp?.projResearchEndDateForDisplay;
    if (!end) end = "Present";
    let start = exp?.projResearchStartDateForDisplay;
    if (!start) start = "January 1970";
    let display = `${start} - ${end}`;
    return display;
  };
  const card = (exp) => (
    <React.Fragment>
      <CardContent>
        {exp?.projResearchStartDateForDisplay && (
          <div className="flex">
            <Typography
              sx={{ fontSize: 14 }}
              color={`${
                getMode() === THEME_MODES.DARK ? "" : "text.secondary"
              }`}
              gutterBottom
            >
              {getDurationOfexperience(exp)}
            </Typography>

            {props?.owner && (
              <div className=" text-sm dark:text-gray-500 text-gray-700 cursor-pointer ml-auto">
                <Tooltip title={USER_PROFILE.CHANGE_WORK_EXPERIENCE}>
                  <Edit />
                </Tooltip>
              </div>
            )}
          </div>
        )}

        {exp?.projectResearchTitle && (
          <Typography variant="h5" component="div">
            {exp?.projectResearchTitle}
          </Typography>
        )}

        {exp?.educationInstitution && (
          <Typography
            sx={{ mb: 1.5 }}
            color={`${getMode() === THEME_MODES.DARK ? "" : "text.secondary"}`}
          >
            {exp?.educationInstitution} {exp?.campus ? `,${exp?.campus}` : ""}
          </Typography>
        )}

        {exp?.projectResearchDescription && (
          <>
            <ReadMore
              parseHtml
              initialReadLimit={READ_MORE_MAX_LENGTH}
              color={`${
                getMode() === THEME_MODES.DARK ? "" : "text.secondary"
              }`}
            >
              {exp?.projectResearchDescription}
            </ReadMore>
          </>
        )}
      </CardContent>
    </React.Fragment>
  );
  return (
    <>
      {props?.owner && (
        <div
          onClick={() =>
            props.consumeEvent({
              id: 3,
              event: "init_edit",
              component: "WorkExperience",
            })
          }
          className=" text-sm dark:text-gray-500 text-gray-700 cursor-pointer ml-auto float-right"
        >
          <Tooltip title={USER_PROFILE.ADD_WORK_EXPERIENCE}>
            <AddCircleOutlined />
          </Tooltip>
        </div>
      )}

      {experiences && experiences.length > 0 && (
        <>
          <Box
            sx={{
              width: "100%",
              maxHeight: 400,
              overflow: "auto",
              marginTop: 4,
            }}
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {experiences?.map((experience, index) => (
                <Grid key={index} item xs={12} lg={6} md={6} sm={12}>
                  <Card
                    className="dark:bg-gray-950 bg-white-100 dark:text-gray-500 text-gray-700"
                    variant="outlined"
                  >
                    {card(experience)}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
      {experiences.length === 0 && (
        <NoData message="No project or work experience available." />
      )}
    </>
  );
}
export default WorkExperience;
