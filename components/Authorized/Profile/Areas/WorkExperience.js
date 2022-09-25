import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, Tooltip } from "@mui/material";
import NoData from "../../Shared/NoData";
import {
  READ_MORE_MAX_LENGTH,
  RESPONSE_TYPES,
} from "../../../../constants/constants";
import { getMode, THEME_MODES } from "../../../../theme/ThemeProvider";
import ReadMore from "../../../shared/ReadMore";
import { USER_PROFILE } from "../../../../constants/userdata";
import { AddCircleOutlined } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@material-ui/icons";
import { toast } from "react-toastify";
import ChangeWorkExperience from "../../../shared/modals/ChangeWorkExperienceDialog";
import UserDataService from "../../../../pages/api/users/data/UserDataService";
import { handleResponse } from "../../../../toastr-response-handler/handler";
toast.configure();
function WorkExperience(props) {
  const [experiences, setExperiences] = useState([]);
  const [workExperienceDialogOpen, setWorkExperienceDialogOpen] =
    useState(false);
  const [workExperienceChangeMode, setWorkExperienceChangeMode] =
    useState(null);
  const [workExperience, setWorkExperience] = useState(null);
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
  const handleWorkExperienceAdd = () => {
    setWorkExperienceChangeMode("add");
    setWorkExperienceDialogOpen(true);
    setWorkExperience(null);
  };
  const handleWorkExperiencEdit = (e, expierenceData) => {
    setWorkExperienceChangeMode("edit");
    setWorkExperienceDialogOpen(true);
    setWorkExperience(expierenceData);
  };

  const handleWorkExperiencRemove = (e, expierenceData) => {
    const isPresent = expierenceData?.isPresent === "T";
    expierenceData.deleting = true;
    setWorkExperience(expierenceData);
    setWorkExperienceChangeMode("delete");
    const data = {
      designation: expierenceData.projectResearchTitle,
      organization: expierenceData.projectResearchExpEducationInsitution,
      location: expierenceData.projectResearchExpCampus,
      presentWorkPlace: isPresent,
      fromDate: expierenceData.projResearchStartDateForDisplay,
      toDate: expierenceData.projResearchEndDateForDisplay,
      description: expierenceData.projectResearchDescription,
      projectResearchExpId: expierenceData.projectResearchExpId,
    };
    var fromMonth, toMonth, fromYear, toYear;
    try {
      fromMonth =
        data?.fromDate?.$M + 1 > 9
          ? (data?.fromDate?.$M + 1).toString()
          : ("0" + (data?.fromDate?.$M + 1)).toString();

      if (data.presentWorkPlace === false) {
        toMonth =
          data?.toDate?.$M + 1 > 9
            ? (data?.toDate?.$M + 1).toString()
            : ("0" + (data?.toDate?.$M + 1)).toString();
        toYear = (data?.toDate.$y).toString();
      } else {
        toMonth = "";
        toYear = "";
      }

      fromYear = (data?.fromDate.$y).toString();
    } catch (error) {
      const _fromDate = new Date(data.fromDate);
      const _toDate = new Date(data.toDate);
      fromMonth =
        _fromDate.getMonth() + 1 > 9
          ? (_fromDate.getMonth() + 1).toString()
          : ("0" + (_fromDate.getMonth() + 1)).toString();

      if (data.presentWorkPlace === false) {
        toMonth =
          _toDate.getMonth() + 1 > 9
            ? (_toDate.getMonth() + 1).toString()
            : ("0" + (_toDate.getMonth() + 1)).toString();

        toYear = _toDate.getFullYear().toString();
      } else {
        toMonth = "";
        toYear = "";
      }

      fromYear = _fromDate.getFullYear().toString();
    }
    const payload = {
      projectResearchExpId: data.projectResearchExpId,
      projectResearchDescription: data.description,
      projectResearchExpEducationInsitution: data.organization,
      projectResearchTitle: data.designation,
      projectResearchExpCampus: data.location,
      fromMonth,
      fromYear,
      toMonth,
      toYear,
      wsisPresent: data.presentWorkPlace,
      isPresent: data.presentWorkPlace === true ? "T" : "F",
      projectResearchStartDate: `${fromMonth}/01/${fromYear}`,
      projectResearchEndDate: `${
        data.presentWorkPlace === false ? toMonth + "/01/" + toYear : ""
      }`,
    };
    UserDataService.removeWorkExperience(payload)
      .then((res) => {
        props.consumeEvent({ data: res.data }, "WorkExperience");
        setWorkExperienceChangeMode(null);
        setWorkExperienceDialogOpen(false);
        setWorkExperience(null);
        expierenceData.deleting = false;
        handleResponse(
          `${USER_PROFILE.WORK_EXPERIENCE_DELETED.replace('<#X#>',payload.projectResearchTitle)}`,
          RESPONSE_TYPES.SUCCESS,
          toast.POSITION.BOTTOM_CENTER
        );
      })
      .catch((error) => {
        setWorkExperienceChangeMode(null);
        setWorkExperienceDialogOpen(false);
        setWorkExperience(null);
        expierenceData.deleting = false;
        handleResponse(
          `${USER_PROFILE.WORK_EXPERIENCE_DELETE_FAILED}`,
          RESPONSE_TYPES.ERROR,
          toast.POSITION.BOTTOM_CENTER
        );
      });
  };
  const card = (exp) => (
    <React.Fragment>
      <CardContent>
        <div className="flex">
          {exp?.projResearchStartDateForDisplay && (
            <Typography
              sx={{ fontSize: 14 }}
              color={`${
                getMode() === THEME_MODES.DARK ? "" : "text.secondary"
              }`}
              gutterBottom
            >
              {getDurationOfexperience(exp)}
            </Typography>
          )}
          {props?.owner && (
            <div className="ml-auto">
              <div className="flex">
                <div
                  onClick={(event) => handleWorkExperiencEdit(event, exp)}
                  className=" text-sm dark:text-gray-500 text-gray-700 cursor-pointer "
                >
                  <Tooltip title={USER_PROFILE.CHANGE_WORK_EXPERIENCE}>
                    <Edit />
                  </Tooltip>
                </div>
                <div
                  onClick={(event) => handleWorkExperiencRemove(event, exp)}
                  className={`${
                    exp?.deleting ? "control__disabled__opaque" : ""
                  } text-sm dark:text-gray-500 text-gray-700 cursor-pointer`}
                >
                  <Tooltip title={USER_PROFILE.REMOVE_WORK_EXPERIENCE}>
                    <DeleteIcon />
                  </Tooltip>
                </div>
              </div>
            </div>
          )}
        </div>

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
  const handleWorkExperienceChangeEvent = (obj) => {
    if (obj.close) {
      setWorkExperienceDialogOpen(false);
      setWorkExperienceChangeMode(null);
      return;
    }
    const data = obj.data;
    var fromMonth, toMonth, fromYear, toYear;
    try {
      fromMonth =
        data?.fromDate?.$M + 1 > 9
          ? (data?.fromDate?.$M + 1).toString()
          : ("0" + (data?.fromDate?.$M + 1)).toString();

      if (data.presentWorkPlace === false) {
        toMonth =
          data?.toDate?.$M + 1 > 9
            ? (data?.toDate?.$M + 1).toString()
            : ("0" + (data?.toDate?.$M + 1)).toString();
        toYear = (data?.toDate.$y).toString();
      } else {
        toMonth = "";
        toYear = "";
      }

      fromYear = (data?.fromDate.$y).toString();
    } catch (error) {
      const _fromDate = new Date(data.fromDate);
      const _toDate = new Date(data.toDate);
      fromMonth =
        _fromDate.getMonth() + 1 > 9
          ? (_fromDate.getMonth() + 1).toString()
          : ("0" + (_fromDate.getMonth() + 1)).toString();

      if (data.presentWorkPlace === false) {
        toMonth =
          _toDate.getMonth() + 1 > 9
            ? (_toDate.getMonth() + 1).toString()
            : ("0" + (_toDate.getMonth() + 1)).toString();

        toYear = _toDate.getFullYear().toString();
      } else {
        toMonth = "";
        toYear = "";
      }

      fromYear = _fromDate.getFullYear().toString();
    }

    if (obj.event === "edit") {
      const payload = {
        projectResearchExpId: data.projectResearchExpId,
        projectResearchDescription: data.description,
        projectResearchExpEducationInsitution: data.organization,
        projectResearchTitle: data.designation,
        projectResearchExpCampus: data.location,
        fromMonth,
        fromYear,
        toMonth,
        toYear,
        wsisPresent: data.presentWorkPlace,
        isPresent: data.presentWorkPlace === true ? "T" : "F",
        projectResearchStartDate: `${fromMonth}/01/${fromYear}`,
        projectResearchEndDate: `${
          data.presentWorkPlace === false ? toMonth + "/01/" + toYear : ""
        }`,
      };
      // edit
      UserDataService.editWorkExperience(payload)
        .then((res) => {
          props.consumeEvent({ data: res.data }, "WorkExperience");
          setWorkExperienceChangeMode(null);
          setWorkExperienceDialogOpen(false);
          setWorkExperience(null);
          handleResponse(
            `${USER_PROFILE.WORK_EXPERIENCE_UPDATED}`,
            RESPONSE_TYPES.SUCCESS,
            toast.POSITION.BOTTOM_CENTER
          );
        })
        .catch((error) => {
          setWorkExperienceChangeMode(null);
          setWorkExperienceDialogOpen(false);
          setWorkExperience(null);
          handleResponse(
            `${USER_PROFILE.WORK_EXPERIENCE_UPDATE_FAILED}`,
            RESPONSE_TYPES.ERROR,
            toast.POSITION.BOTTOM_CENTER
          );
        });
    } else {
      const payload = {
        projectResearchDescription: data.description,
        projectResearchExpEducationInsitution: data.organization,
        projectResearchTitle: data.designation,
        projectResearchExpCampus: data.location,
        fromMonth,
        fromYear,
        toMonth,
        toYear,
        isPresent: data.presentWorkPlace === true ? "T" : "F",
        projectResearchStartDate: `${fromMonth}/01/${fromYear}`,
        projectResearchEndDate: `${
          data.presentWorkPlace === false ? toMonth + "/01/" + toYear : ""
        }`,
      };
      // add new
      UserDataService.addWorkExperience(payload)
        .then((res) => {
          props.consumeEvent({ data: res.data }, "WorkExperience");
          setWorkExperienceChangeMode(null);
          setWorkExperienceDialogOpen(false);
          setWorkExperience(null);
          handleResponse(
            `${USER_PROFILE.WORK_EXPERIENCE_UPDATED}`,
            RESPONSE_TYPES.SUCCESS,
            toast.POSITION.BOTTOM_CENTER
          );
        })
        .catch((error) => {
          setWorkExperienceChangeMode(null);
          setWorkExperienceDialogOpen(false);
          setWorkExperience(null);
          handleResponse(
            `${USER_PROFILE.WORK_EXPERIENCE_UPDATE_FAILED}`,
            RESPONSE_TYPES.ERROR,
            toast.POSITION.BOTTOM_CENTER
          );
        });
    }
  };
  return (
    <>
      {props?.owner && (
        <div
          onClick={handleWorkExperienceAdd}
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

      {props?.owner && (
        <ChangeWorkExperience
          title={`${
            workExperienceChangeMode == "add"
              ? "Add new work experience"
              : "Update work experience"
          }`}
          theme
          dialogCloseRequest={handleWorkExperienceChangeEvent}
          mode={workExperienceChangeMode}
          data={workExperience ?? null}
          isOpen={workExperienceDialogOpen}
        />
      )}
    </>
  );
}
export default WorkExperience;
