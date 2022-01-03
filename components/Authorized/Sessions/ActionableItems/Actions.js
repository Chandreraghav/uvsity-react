import { Tooltip } from "@mui/material";
import React from "react";
import { SESSION_ACTIONS } from "../../../../constants/userdata";
import { useDataLayerContextValue } from "../../../../context/DataLayer";
import SessionStyle from "../../../../styles/Session.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function Actions(props) {
  const [USERDATA, dispatch] = useDataLayerContextValue();
  const isMeTheOwner = (oid) => {
    return USERDATA?.LOGGED_IN_INFO?.data?.userDetailsId === oid;
  };
  const isSessionRegistrationPossible = () => {
    if (props.data.owner) {
      //you the owner of the session
      return {
        status: "OWNER",
        action:'registration',
        flag: false,
      };
    }
    if (props.data.userRegistered) {
      //you have registered already
      return {
        status: "ALREADY_REGISTERED",
        action:'registration',
        flag: false,
      };
    }
    if (!props.data.userRegistered && props.data.courseStatus == "Expired") {
      //session has expired
      return {
        status: "SESSION_EXPIRED",
        action:'registration',
        flag: false,
      };
    }

    if (
      !props.data.userRegistered &&
      (props.data.courseStatus == "Approved" ||
        props.data.courseStatus == "Active") &&
      !props.data.isRegistrationPossible
    ) {
      //  Registration Full. The owner of this session is not accepting any new registration.
      if (!props.data.owner) {
        return {
          status: "REGISTRATION_FULL",
          flag: false,
          action:'registration',
        };
      }
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
        return {
          status: "PAID",
          questionaire: false,
          flag: true,
          action:'registration',
        };
      }
      if (
        props.data.owner != true &&
        props.data.cost &&
        props.data.registrationQuestionnaireId != undefined &&
        props.data.registrationQuestionnaireId > 0
      ) {
        //paid with questionaire
        return {
          status: "PAID",
          questionaire: true,
          flag: true,
          action:'registration',
        };
      }

      if (
        props.data.owner != true &&
        !props.data.cost &&
        props.data.registrationQuestionnaireId != undefined &&
        props.data.registrationQuestionnaireId > 0
      ) {
        // free with questionaire
        return {
          status: "FREE",
          questionaire: true,
          flag: true,
          action:'registration',
        };
      }

      if (
        props.data.owner != true &&
        !props.data.cost &&
        (props.data.registrationQuestionnaireId == undefined ||
          props.data.registrationQuestionnaireId == 0 ||
          props.data.registrationQuestionnaireId == null)
      ) {
        // free without questionaire
        return {
          status: "FREE",
          questionaire: false,
          flag: true,
          action:'registration',
        };
      }
    }

    return {
      status: null,
      flag: false,
      action:'registration',
    };
  };
  const isSessionSponsorshipPossible = () => {
    if (
      !props.data.userRegistered &&
      (props.data.courseStatus == "Approved" ||
        props.data.courseStatus == "Active") &&
      props.data.isRegistrationPossible
    ) {
      if (props.data.sponsorshipRequired) {
        return {
          flag: true,
          action:'sponsorship',
        };
      }
    }

    if (
      !props.data.userRegistered &&
      (props.data.courseStatus == "Approved" ||
        props.data.courseStatus == "Active")
    ) {
      if (props.data.sponsorshipRequired) {
        return {
          flag: true,
          action:'sponsorship',
        };
      }
      if (
        props.data.userRegistered &&
        (props.data.courseStatus == "Approved" ||
          props.data.courseStatus == "Active")
      ) {
        if (props.data.sponsorshipRequired) {
          return {
            flag: true,
            action:'sponsorship',
          };
        }
      }
      return {
        flag: false,
        action:'sponsorship',
      };
    }
    return {
      flag: false,
      action:'sponsorship',
    };
  };
  const getStatus = (action, returnType) => {
    if (returnType === "action-request-status") {
      switch (action.id) {
        case 1:
          return isSessionRegistrationPossible();
        case 2:
          return isSessionSponsorshipPossible();
        case 3:
          return { 
            flag: true,
            action: 'view-session' };
      }
    }
    if (returnType === "boolean") {
      switch (action.id) {
        case 1:
          return !isSessionRegistrationPossible().flag;
        case 2:
          return !isSessionSponsorshipPossible().flag;
      }
      return false;
    }
    if (returnType === "text") {
      switch (action.id) {
        case 1:
          const registrationObject = isSessionRegistrationPossible();
          if (!registrationObject?.flag) {
            if (
              registrationObject.status === "OWNER" ||
              registrationObject.status === "SESSION_EXPIRED" ||
              registrationObject.status === "REGISTRATION_FULL"
            )
              return null;
            if (registrationObject.status === "ALREADY_REGISTERED")
              return "Registered";
          }
          return action.title;
        case 2:
          const sponsorshipObject = isSessionSponsorshipPossible();
          if (!sponsorshipObject?.flag) return null;
          return action.title;
      }
    }
    return action.title;
  };
  const initiateActionRequest = (action) => {
    console.log(getStatus(action, "action-request-status"));
  };
  return (
    <div
      className={`${SessionStyle.session__actions} flex text-sm px-2 py-2 gap-2`}
    >
      {SESSION_ACTIONS.filter(
        (action) => !action.hidden && !action.disabled
      ).map((action, index) => {
        return (
          <div
            onClick={(e) => initiateActionRequest(action)}
            key={index}
            className={`flex ${SessionStyle.session__action} ${
              getStatus(action, "boolean") && getActionStatus() !== "Registered"
                ? "control__disabled__opaque"
                : ""
            }`}
          >
            {getActionStatus() !== null ? (
              <>
                <div className={`items-center`}>
                  <Tooltip
                    title={
                      getActionStatus() !== "Registered"
                        ? action.tooltip
                        : "You have registered for this session"
                    }
                  >
                    <span>
                      {getActionStatus() !== "Registered" ? (
                        action.icon
                      ) : (
                        <>
                          <CheckCircleIcon className={`theme-color font-semibold leading-tight`} />
                        </>
                      )}
                    </span>
                  </Tooltip>
                </div>
                <div className={`text-center items-center text-sm flex`}>
                  <div
                    className={`${
                      getActionStatus() === "Registered"
                        ? "theme-color font-semibold leading-tight"
                        : ""
                    }`}
                  >
                    {getActionStatus()}
                  </div>
                </div>
                {index < SESSION_ACTIONS.length - 1 && (
                  <div className={`vertical-bar`}></div>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        );

        function getActionStatus() {
          return getStatus(action, "text");
        }
      })}
    </div>
  );
}

export default Actions;
