import { Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Spacer from "../../../shared/Spacer";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import NoData from "../../Shared/NoData";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { USER_PROFILE } from "../../../../constants/userdata";
import PastEducationManager from "./PastEducationManager";
import UserDataService from "../../../../pages/api/users/data/UserDataService";
import { handleResponse } from "../../../../toastr-response-handler/handler";
import { RESPONSE_TYPES } from "../../../../constants/constants";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
toast.configure();
function Education(props) {
  const [education, setEducation] = useState({
    highestLevel: null,
    pastEducation: [],
  });

  const [addPastEducationMode, setAddPastEducationMode] = useState(false);
  const [editPastEducationMode, setEditPastEducationMode] = useState(false);
  const [removePastEducationMode, setRemovePastEducationMode] = useState(false);
  useEffect(() => {
    setEducation(props.education);
    return () => setEducation({ highestLevel: null, pastEducation: [] });
  }, [props.education]);
  const [outcome, setOutcome] = useState({
    error: false,
    complete: false,
    errorData: [],
  });

  const handleHighestDegreeUpdate = () => {
    props.consumeEvent({
      id: 8,
      event: "init_edit",
      component: "Education",
      pastEducation: education?.pastEducation,
      highestLevel: education?.highestLevel,
    });
  };

  const handlePastEducationEvent = (event) => {
    if (!event) return;
    switch (event.operation) {
      case "cancel":
        if (event.mode === "add") setAddPastEducationMode(false);
        if (event.mode === "edit" && event.data) {
          setEditPastEducationMode(false);
          const educationData = event.data;
          const _pastEducation = education?.pastEducation;
          const selectedPastEducationIdx = _pastEducation.findIndex(
            (pastEducation) =>
              pastEducation.pastEducationId === educationData.pastEducationId
          );
          if (selectedPastEducationIdx !== -1) {
            _pastEducation[selectedPastEducationIdx].editMode = false;
            setEducation({
              highestLevel: education.highestLevel,
              pastEducation: _pastEducation,
            });
          }
        }
        break;

      case "submit_education_data":
        var fromMonth, toMonth, fromYear, toYear, payload;
        try {
          fromMonth =
            event.data?.fromDate?.$M + 1 > 9
              ? (event.data?.fromDate?.$M + 1).toString()
              : ("0" + (event.data?.fromDate?.$M + 1)).toString();
          toMonth =
            event.data?.toDate?.$M + 1 > 9
              ? (event.data?.toDate?.$M + 1).toString()
              : ("0" + (event.data?.toDate?.$M + 1)).toString();
          fromYear = (event.data?.fromDate.$y).toString();
          toYear = (event.data?.toDate.$y).toString();
        } catch (error) {
          const _fromDate = new Date(event.data.fromDate);
          const _toDate = new Date(event.data.toDate);
          fromMonth =
            _fromDate.getMonth() + 1 > 9
              ? (_fromDate.getMonth() + 1).toString()
              : ("0" + (_fromDate.getMonth() + 1)).toString();
          toMonth =
            _toDate.getMonth() + 1 > 9
              ? (_toDate.getMonth() + 1).toString()
              : ("0" + (_toDate.getMonth() + 1)).toString();
          fromYear = _fromDate.getFullYear().toString();
          toYear = _toDate.getFullYear().toString();
        }

        if (event.mode === "add") {
          payload = {
            degreeCourse: event.data?.degree,
            educationEndDate: `${toMonth}/01/${toYear}`,
            educationStartDate: `${fromMonth}/01/${fromYear}`,
            fromMonth,
            fromYear,
            isPresent: "F",
            pastEducationCampus: event.data?.campus,
            pastEducationEducationInstitution: event.data?.educationInstitution,
            toMonth,
            toYear,
          };
          UserDataService.addPastEducation(payload)
            .then((res) => {
              props.consumeEvent({
                id: 8,
                event: "past_education_edit_done",
                component: "PastEducation",
                pastEducation: res.data,
                highestLevel: education?.highestLevel,
              });
              handleResponse(
                `${USER_PROFILE.PAST_EDUCATION_UPDATED}`,
                RESPONSE_TYPES.SUCCESS,
                toast.POSITION.BOTTOM_CENTER
              );
              setAddPastEducationMode(false);
              setOutcome({ error: false, complete: true, errorData: [] });
            })
            .catch((err) => {
              handleResponse(
                `${USER_PROFILE.PAST_EDUCATION_UPDATE_FAILED}`,
                RESPONSE_TYPES.ERROR,
                toast.POSITION.BOTTOM_CENTER
              );
              setOutcome({
                error: true,
                complete: true,
                errorData: err?.data?.Uvsity_Errors || [],
              });
            });
        }

        if (event.mode === "edit") {
          payload = {
            degreeCourse: event.data?.degree,
            educationEndDate: `${toMonth}/01/${toYear}`,
            educationStartDate: `${fromMonth}/01/${fromYear}`,
            fromMonth,
            fromYear,
            isPresent: "F",
            pastEducationCampus: event.data?.campus,
            pastEducationEducationInstitution: event.data?.educationInstitution,
            pastEducationId: event.data?.pastEducationId,
            toMonth,
            toYear,
          };
          UserDataService.editPastEducation(payload)
            .then((res) => {
              props.consumeEvent({
                id: 8,
                event: "past_education_edit_done",
                component: "PastEducation",
                pastEducation: res.data,
                highestLevel: education?.highestLevel,
              });
              handleResponse(
                `${USER_PROFILE.PAST_EDUCATION_UPDATED}`,
                RESPONSE_TYPES.SUCCESS,
                toast.POSITION.BOTTOM_CENTER
              );
              setAddPastEducationMode(false);
              setOutcome({ error: false, complete: true, errorData: [] });
            })
            .catch((err) => {
              handleResponse(
                `${USER_PROFILE.PAST_EDUCATION_UPDATE_FAILED}`,
                RESPONSE_TYPES.ERROR,
                toast.POSITION.BOTTOM_CENTER
              );
              setOutcome({
                error: true,
                complete: true,
                errorData: err?.data?.Uvsity_Errors || [],
              });
            });
          return;
        }
        break;

      case "remove_education_data":
        const _fromMonth = new Date(event.data?.educationStartDate).getMonth();
        fromMonth =
          _fromMonth > 9
            ? _fromMonth.toString()
            : ("0" + _fromMonth).toString();
        const _toMonth = new Date(event.data?.educationEndDate).getMonth();

        toMonth =
          _toMonth > 9 ? _toMonth.toString() : ("0" + _toMonth).toString();
        const _fromYear = new Date(
          event.data?.educationStartDate
        ).getFullYear();
        const _toYear = new Date(event.data?.educationEndDate).getFullYear();

        fromYear = _fromYear.toString();
        toYear = _toYear.toString();
        payload = {
          degreeCourse: event.data?.degreeCourse,
          educationEndDate: event.data?.educationEndDate,
          educationStartDate: event.data?.educationStartDate,
          fromMonth,
          fromYear,
          isPresent: event.data?.isPresent,
          pastEducationCampus: event.data?.pastEducationCampus,
          pastEducationEducationInstitution:
            event.data?.pastEducationEducationInstitution,
          pastEducationId: event.data?.pastEducationId,
          toMonth,
          toYear,
        };
        UserDataService.removePastEducation(payload)
          .then((res) => {
            props.consumeEvent({
              id: 8,
              event: "past_education_edit_done",
              component: "PastEducation",
              pastEducation: res.data,
              highestLevel: education?.highestLevel,
            });
            handleResponse(
              `${USER_PROFILE.PAST_EDUCATION_DELETED.replace(
                "<#X#>",
                payload.degreeCourse
              )}`,
              RESPONSE_TYPES.SUCCESS,
              toast.POSITION.BOTTOM_CENTER
            );
            setRemovePastEducationMode(false);

            setOutcome({ error: false, complete: true, errorData: [] });
          })
          .catch((err) => {
            handleResponse(
              `${USER_PROFILE.PAST_EDUCATION_DELETE_FAILED}`,
              RESPONSE_TYPES.ERROR,
              toast.POSITION.BOTTOM_CENTER
            );
            setOutcome({
              error: true,
              complete: true,
              errorData: err?.data?.Uvsity_Errors || [],
            });
          });
        break;
      default:
        break;
    }
  };
  const handleDeletePastEducation = (event, educationData) => {
    setRemovePastEducationMode(true);
    const _pastEducation = education?.pastEducation;
    const selectedPastEducationIdx = _pastEducation.findIndex(
      (pastEducation) =>
        pastEducation.pastEducationId === educationData.pastEducationId
    );
    if (selectedPastEducationIdx !== -1) {
      _pastEducation[selectedPastEducationIdx].deleteMode =
        !_pastEducation[selectedPastEducationIdx].deleteMode;
      setEducation({
        highestLevel: props.education.highestLevel,
        pastEducation: _pastEducation,
      });
      const _event = {
        operation: "remove_education_data",
        data: educationData,
        additionalData: {
          pastEducation: _pastEducation,
          selectedPastEducationIdx,
        },
      };
      handlePastEducationEvent(_event);
      return;
    }
    setRemovePastEducationMode(false);
    handleResponse(
      `${USER_PROFILE.PAST_EDUCATION_DELETE_FAILED}`,
      RESPONSE_TYPES.ERROR,
      toast.POSITION.BOTTOM_CENTER
    );
  };

  const handleEditPastEducation = (event, educationData) => {
    setEditPastEducationMode(true);
    const _pastEducation = education?.pastEducation;
    const selectedPastEducationIdx = _pastEducation.findIndex(
      (pastEducation) =>
        pastEducation.pastEducationId === educationData.pastEducationId
    );
    if (selectedPastEducationIdx !== -1) {
      _pastEducation[selectedPastEducationIdx].editMode =
        !_pastEducation[selectedPastEducationIdx].editMode;
      setEducation({
        highestLevel: props.education.highestLevel,
        pastEducation: _pastEducation,
      });
      return;
    }
    setEditPastEducationMode(false);
    handleResponse(
      `${USER_PROFILE.PAST_EDUCATION_UPDATE_FAILED}`,
      RESPONSE_TYPES.ERROR,
      toast.POSITION.BOTTOM_CENTER
    );
  };
  
  function preConditionsMet(education) {
    if(props.owner){
      return education?.degreeCourse &&
      education.pastEducationEducationInstitution &&
      education?.pastEducationCampus;
    }
    return education?.degreeCourse &&
    education.educationInstitution &&
    education?.campus;
   
  }
  return education ? (
    <>
      {education?.highestLevel ? (
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
              
              <Typography
                className="mt-0.5"
                variant="h5"
              ><AddIcon  />{`${USER_PROFILE.ADD_HIGHEST_DEGREE}`}</Typography>
            </div>
          )}
        </>
      )}
      {education?.pastEducation && education?.pastEducation.length > 0 && (
        <>
          <Spacer />
          <div className="flex flex-col space-y-2">
            <Typography variant="div" sx={{ fontSize: 14, color: "#7393B3" }}>
              <u>P</u>ast Education
            </Typography>
            <div>
              {education?.pastEducation?.map((education, idx) => (
                <div className="flex" key={idx}>
                  {preConditionsMet(education) && (
                      <>
                        <div
                          className={`${
                            education?.deleteMode ? " opacity-40" : ""
                          } flex   text-xs lg:text-sm xl:text-sm mb-2`}
                        >
                          <DoubleArrowIcon sx={{ color: "#60A5FA" }} />
                          <div className="flex flex-col">
                            <div className=" dark:text-gray-500 text-blue-400 font-semibold line-clamp-1">
                              {education.degreeCourse} from &nbsp;
                              {education?.pastEducationEducationInstitution??education?.educationInstitution}
                            </div>
                            <div>
                              <div className="text-xs dark:font-semibold dark:text-gray-500  text-gray-700">
                                <span>{education?.pastEducationCampus??education?.campus}</span>
                                &nbsp;&#8739;&nbsp;
                                <span>
                                  {education.educationStartDateForDisplay}{" "}
                                  -&nbsp;
                                  {education.educationEndDateForDisplay}
                                </span>
                              </div>
                            </div>

                            {props.owner && education?.editMode && (
                              <div className="py-2">
                                <PastEducationManager
                                  operationOutcome={outcome}
                                  event={handlePastEducationEvent}
                                  mode="edit"
                                  data={education}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  {props.owner && (
                    <div
                      className={`${
                        education?.deleteMode ? " opacity-40" : ""
                      } ml-auto justify-end`}
                    >
                      <div className="flex gap-2">
                        <Tooltip title={USER_PROFILE.EDIT_PAST_EDUCATION_INFO}>
                          <div
                            onClick={(event) =>
                              handleEditPastEducation(event, education)
                            }
                            className={` 
                            hover:cursor-pointer dark:text-blue-800 text-gray-dark`}
                          >
                            <EditIcon size="small" />
                          </div>
                        </Tooltip>
                        <Tooltip
                          title={
                            USER_PROFILE.PLACEHOLDERS.REMOVE_PAST_EDUCATION
                          }
                        >
                          <div
                            onClick={(event) =>
                              handleDeletePastEducation(event, education)
                            }
                            className={` ${
                              education?.deleteMode ? "control__disabled" : ""
                            } hover:cursor-pointer dark:text-blue-800 text-gray-dark`}
                          >
                            <DeleteIcon size="small" />
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {props.owner && (
        <>
          {!addPastEducationMode && (
            <div
              onClick={() => setAddPastEducationMode(true)}
              className=" hover:cursor-pointer dark: text-gray-600  text-gray-600  leading-tight flex mt-2"
            >
              <Typography className="mt-0.5" variant="h6">
                <AddIcon /> {`${USER_PROFILE.ADD_PAST_EDUCATION}`}
              </Typography>
            </div>
          )}

          {addPastEducationMode && (
            <PastEducationManager
              operationOutcome={outcome}
              event={handlePastEducationEvent}
              mode="add"
            />
          )}
        </>
      )}
    </>
  ) : (
    <div>
      {!props.owner &&<><NoData message="No details available." /></>}
      {props.owner && (
            <div
              onClick={handleHighestDegreeUpdate}
              className=" hover:cursor-pointer dark: text-gray-600  text-gray-600  leading-loose flex gap-2"
            >
              
              <Typography
                className="mt-0.5"
                variant="h5"
              ><AddIcon />{`${USER_PROFILE.ADD_HIGHEST_DEGREE}`}</Typography>
            </div>
          )}
      {props.owner && (
        <>
          {!addPastEducationMode && (
            <div
              onClick={() => setAddPastEducationMode(true)}
              className=" hover:cursor-pointer dark: text-gray-600  text-gray-600  leading-tight flex mt-2"
            >
              <Typography className="mt-0.5" variant="h6">
                <AddIcon /> {`${USER_PROFILE.ADD_PAST_EDUCATION}`}
              </Typography>
            </div>
          )}

          {addPastEducationMode && (
            <PastEducationManager
              operationOutcome={outcome}
              event={handlePastEducationEvent}
              mode="add"
            />
          )}
        </>
      )}
      
    </div>
    
  );
}

export default Education;


