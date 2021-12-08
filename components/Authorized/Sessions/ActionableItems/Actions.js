import { Tooltip } from "@mui/material";
import React from "react";
import { SESSION_ACTIONS } from "../../../../constants/userdata";
import { useDataLayerContextValue } from "../../../../context/DataLayer";
import SessionStyle from "../../../../styles/Session.module.css";
function Actions(props) {
  const [USERDATA, dispatch] = useDataLayerContextValue();
  console.log(props.data);
  const isMeTheOwner = (oid) => {
    return USERDATA?.LOGGED_IN_INFO?.data?.userDetailsId === oid;
  };
  const isSessionRegistrationPossible = () => {
    if (props.data.owner) {
      //you the owner of the session
      console.log("you are the owner of the session");
      return false;
    }
    if (props.data.userRegistered) {
      //you have registered already
      console.log("you have registered already");
      return false;
    }
    if (
      props.data.userRegistered == false &&
      props.data.courseStatus == "Expired"
    ) {
      //session has expired
      console.log("session expired");
      return false;
    }
    if (
      !props.data.userRegistered &&
      (props.data.courseStatus == "Approved" ||
        props.data.courseStatus == "Active") &&
      props.data.isRegistrationPossible
    ) {
      if (
        props.data.owner != true &&
        props.data.cost &&
        (props.data.registrationQuestionnaireId == undefined ||
          props.data.registrationQuestionnaireId == 0 ||
          props.data.registrationQuestionnaireId == null)
      ) {
        //paid without questionaire
        console.log("paid without questionaire");
        return true;
      }
      if (
        props.data.owner != true &&
        props.data.cost &&
        props.data.registrationQuestionnaireId != undefined &&
        props.data.registrationQuestionnaireId > 0
      ) {
        //paid with questionaire
        console.log("paid with questionaire");
        return true;
      }

      if (
        props.data.owner != true &&
        !props.data.cost &&
        props.data.registrationQuestionnaireId != undefined &&
        props.data.registrationQuestionnaireId > 0
      ) {
        // free with questionaire
        console.log("free with questionaire");
        return true;
      }

      if (
        props.data.owner != true &&
        !props.data.cost &&
        (props.data.registrationQuestionnaireId == undefined ||
          props.data.registrationQuestionnaireId == 0 ||
          props.data.registrationQuestionnaireId == null)
      ) {
        // free without questionaire
        console.log("free without questionaire");
        return true;
      }
    }

    if (
      props.data.userRegistered == false &&
      (props.data.courseStatus == "Approved" ||
        props.data.courseStatus == "Active") &&
      !props.data.isRegistrationPossible
    ) {
      //  Registration Full. The owner of this session is not accepting any new registration.
      console.log(
        " Registration Full. The owner of this session is not accepting any new registration"
      );
      if (!props.data.owner) {
        return false;
      }
    }

    return false;
  };
  const isSessionSponsorshipPossible = () => {
    if (
      props.data.userRegistered == false &&
      (props.data.courseStatus == "Approved" ||
        props.data.courseStatus == "Active") &&
      !props.data.isRegistrationPossible
    ) {
      if (props.data.sponsorshipRequired) {
        return true;
      }
    }
    if (
      props.data.userRegistered == true &&
      (props.data.courseStatus == "Approved" ||
        props.data.courseStatus == "Active")
    ) {
      if (props.data.sponsorshipRequired) {
        return true;
      }
    }
    if (
      props.data.userRegistered == true &&
      (props.data.courseStatus == "Approved" ||
        props.data.courseStatus == "Active")
    ) {
      if (props.data.sponsorshipRequired) {
        return true;
      }
    }
    return false;
  };
  const isDisabled = (action) => {
    switch (action.id) {
      case 1:
        return !isSessionRegistrationPossible();
      case 2:
        return !isSessionSponsorshipPossible();
      case 3:
        return false;
    }
  };
  return (
    <div
      className={`${SessionStyle.session__actions} flex text-sm px-2 py-2 gap-2`}
    >
      {SESSION_ACTIONS.filter(
        (action) => !action.hidden && !action.disabled
      ).map((action, index) => (
        <div
          key={index}
          className={`flex ${SessionStyle.session__action} ${
            isDisabled(action) ? "control__disabled__opaque" : ""
          }`}
        >
          <div className={`items-center`}>
            <Tooltip title={action.tooltip}>
              <span>{action.icon}</span>
            </Tooltip>
          </div>
          <div className={`text-center items-center text-sm`}>
            {action.title}
          </div>

          {index < SESSION_ACTIONS.length - 1 && (
            <div className={`vertical-bar`}></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Actions;
