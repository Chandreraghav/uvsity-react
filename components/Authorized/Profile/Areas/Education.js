import { Tooltip, Typography } from "@mui/material";
import React, {useState} from "react";
import Spacer from "../../../shared/Spacer";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import NoData from "../../Shared/NoData";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { USER_PROFILE } from "../../../../constants/userdata";
import PastEducationManager from "./PastEducationManager";

function Education(props) {
  const [editMode, setEditMode]=useState(false)
  const handleHighestDegreeUpdate = () => {
    props.consumeEvent({
      id: 8,
      event: "init_edit",
      component: "Education",
    });
  };
  const handlePastEducationEvent =(event)=>{
    if(!event) return;
    switch (event.operation) {
      case 'cancel':
        setEditMode(false)
        break;
      case 'submit_education_data':
        console.log(event.data)
        break;
    
      default:
        break;
    }

  }
  return props.education?.highestLevel && props.education?.pastEducation ? (
    <>
      {props.education?.highestLevel ? (
        <div className="flex gap-2 ">
          <Typography
            className="dark:text-gray-500 text-gray-700"
            variant="div"
            sx={{ fontSize: 15 }}
          >
            <u>H</u>ighest Education:
          </Typography>
          <Typography
            className="dark:text-gray-400  text-gray-800"
            variant="div"
            sx={{ fontSize: 14 }}
          >
            {props.education?.highestLevel}
          </Typography>

          {props.owner && (
            <div
              onClick={handleHighestDegreeUpdate}
              className="text-xs hover:cursor-pointer dark:text-gray-400  text-gray-800"
            >
              <Tooltip title={USER_PROFILE.EDIT_HIGHER_EDUCATION_INFO}>
                <EditIcon fontSize="small" />
              </Tooltip>
            </div>
          )}
        </div>
      ) : (
        <>
          {props.owner && (
            <div
              onClick={handleHighestDegreeUpdate}
              className=" hover:cursor-pointer dark: text-gray-600  text-gray-600  leading-loose flex gap-2"
            >
              <AddIcon fontSize="small" />
              <Typography
                className="mt-0.5"
                variant="caption"
              >{`${USER_PROFILE.ADD_HIGHEST_DEGREE}`}</Typography>
            </div>
          )}
        </>
      )}
      {props.education?.pastEducation &&
        props.education?.pastEducation.length > 0 ? (
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
                              <div className=" dark:text-gray-500 text-blue-400 font-semibold line-clamp-1">
                                {education.degreeCourse} from &nbsp;
                                {education.educationInstitution}
                              </div>
                              <div>
                                <div className="text-xs dark:font-semibold dark:text-gray-500  text-gray-700">
                                  <span>{education?.campus}</span>
                                  &nbsp;&#8739;&nbsp;
                                  <span>
                                    {education.educationStartDateForDisplay}{" "}
                                    -&nbsp;
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
        ):(
        <>
        {props.owner && (
          <>
           {!editMode && 
            <div
               onClick={()=>setEditMode(true)}
            className=" hover:cursor-pointer dark: text-gray-600  text-gray-600  leading-tight flex mt-2"
          >
            <AddIcon fontSize="small" />
            <Typography
              className="mt-0.5"
              variant="caption"
            >{`${USER_PROFILE.ADD_PAST_EDUCATION}`}</Typography>
          </div>}
           
            {editMode &&  <PastEducationManager event={handlePastEducationEvent} mode='add'/>}
           
            </>
          )}
        
        </>)}
    </>
  ) : (
    <NoData message="No details available." />
  );
}

export default Education;
