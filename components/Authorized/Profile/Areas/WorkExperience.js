import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import CardActions from "@mui/material/CardActions";
import parse from "html-react-parser";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Stack } from "@mui/material";
import convertToHTML from "markdown-to-html-converter";
import NoData from "../../Shared/NoData";
function WorkExperience(props) {
  const experiences = props?.experiences;
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
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {getDurationOfexperience(exp)}
          </Typography>
        )}

        {exp?.projectResearchTitle && (
          <Typography variant="h5" component="div">
            {exp?.projectResearchTitle}
          </Typography>
        )}

        {exp?.educationInstitution && (
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {exp?.educationInstitution} {exp?.campus ? `,${exp?.campus}` : ""}
          </Typography>
        )}

        {exp?.projectResearchDescription && (
          <Typography className="line-clamp-3" variant="body2">
            {parse(convertToHTML(exp?.projectResearchDescription))}
          </Typography>
        )}
      </CardContent>
    </React.Fragment>
  );
  return experiences && experiences.length > 0 ? (
    <>
      <Box sx={{ width: "100%",maxHeight:400, overflow: "auto" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {experiences?.map((experience, index) => (
            <Grid key={index} item xs={12} lg={6} md={6} sm={12}>
              <Card sx={{minHeight:170, maxHeight:170, overflow: "auto"}} variant="outlined">{card(experience)}</Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  ) : (
    <NoData message='No project or work experience available.'/>
  );
}

export default WorkExperience;
