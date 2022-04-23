import { Typography } from "@mui/material";
import React from "react";
import Spacer from "../../../shared/Spacer";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import NoData from "../../Shared/NoData";

function Education(props) {
  return props.education?.highestLevel && props.education?.pastEducation ? (
    <>
      {props.education?.highestLevel && (
        <div className="flex gap-2">
          <Typography variant="div" sx={{ fontSize: 15, color: "#7393B3" }}>
            <u>H</u>ighest Education:
          </Typography>
          <Typography variant="div" sx={{ fontSize: 14, color: "blue" }}>
            {props.education?.highestLevel}
          </Typography>
        </div>
      )}
      {props.education?.pastEducation &&
        props.education?.pastEducation.length > 0 && (
          <>
            <Spacer />
            <div className="flex flex-col space-y-2">
              <Typography variant="div" sx={{ fontSize: 14, color: "#7393B3" }}>
                <u>P</u>ast Education
              </Typography>
              <div>
                {props?.education?.pastEducation?.map((education, idx) => (
                  <div className="flex" key={idx}>
                    {education?.degreeCourse &&
                      education.educationInstitution &&
                      education?.campus && (
                        <>
                          <div className="flex   text-xs lg:text-sm xl:text-sm mb-2">
                            <DoubleArrowIcon sx={{ color: "#60A5FA" }} />
                            <div className="flex flex-col">
                              <div className="text-blue-400 font-semibold line-clamp-1">
                                {education.degreeCourse} from &nbsp;
                                {education.educationInstitution}
                              </div>
                              <div>
                                <div className="text-xs text-gray-700">
                                  <span>{education?.campus}</span>
                                  &nbsp;|&nbsp;
                                  <span>
                                    {education.educationStartDateForDisplay} -
                                    {education.educationEndDateForDisplay}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
    </>
  ) : (
    <NoData message='No details available.'/>
  );
}

export default Education;
