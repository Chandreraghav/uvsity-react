import { Box, Tooltip, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SESSION_ACTIONS } from "../../../../constants/userdata";
import SessionStyle from "../../../../styles/Session.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function Actions(props) {
  const [actions, setActions] = useState([])
  const isSessionRegistrationPossible = useCallback(() => {
    if (props.data.owner) {
      //you the owner of the session
      return {
        status: "OWNER",
        action: 'registration',
        flag: false,
      };
    }
    if (props.data.userRegistered) {
      //you have registered already
      return {
        status: "ALREADY_REGISTERED",
        action: 'registration',
        flag: false,
      };
    }
    if (!props.data.userRegistered && props.data.courseStatus == "Expired") {
      //session has expired
      return {
        status: "SESSION_EXPIRED",
        action: 'registration',
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
          action: 'registration',
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
          action: 'registration',
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
          action: 'registration',
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
          action: 'registration',
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
          action: 'registration',
        };
      }
    }

    return {
      status: null,
      flag: false,
      action: 'registration',
    };
  }, [props.data.cost, props.data.courseStatus, props.data.isRegistrationPossible, props.data.owner, props.data.registrationQuestionnaireId, props.data.userRegistered]);
  const isSessionSponsorshipPossible = useCallback(() => {
    if (
      !props.data.userRegistered &&
      (props.data.courseStatus == "Approved" ||
        props.data.courseStatus == "Active") &&
      props.data.isRegistrationPossible
    ) {
      if (props.data.sponsorshipRequired) {
        return {
          flag: true,
          action: 'sponsorship',
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
          action: 'sponsorship',
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
            action: 'sponsorship',
          };
        }
      }
      return {
        flag: false,
        action: 'sponsorship',
      };
    }
    return {
      flag: false,
      action: 'sponsorship',
    };
  }, [props.data.courseStatus, props.data.isRegistrationPossible, props.data.sponsorshipRequired, props.data.userRegistered]);
  const getStatus = useCallback((action, returnType) => {
    if (returnType === "action-request-status") {
      switch (action.id) {
        case 1:
          return isSessionRegistrationPossible();
        case 2:
          return isSessionSponsorshipPossible();
        case 3:
          return {
            flag: true,
            action: 'view-session'
          };
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
  }, [isSessionRegistrationPossible, isSessionSponsorshipPossible]);
  const initiateActionRequest = (action) => {
    console.log(getStatus(action, "action-request-status"));
  };

  const getEligibleActions = useCallback(() => {
    const tempActions = SESSION_ACTIONS.slice()
    tempActions.at(0).hidden = !isSessionRegistrationPossible().flag
    if (!tempActions.at(0).hidden) {
      const registration_status = getStatus(tempActions.at(0), 'text')
      if (registration_status && registration_status === 'Registered') {
        tempActions.at(0).title = registration_status
        tempActions.at(0).icon = <CheckCircleIcon />
        tempActions.at(0).tooltip = "You have registered for this session"
      }
    }
    tempActions.at(1).hidden = !isSessionSponsorshipPossible().flag
    setActions(tempActions);
  }, [getStatus, isSessionRegistrationPossible, isSessionSponsorshipPossible]);


  useEffect(() => {
    // 👇️ this only runs once
    getEligibleActions();
    // 👇️ include it in the dependencies array
  }, [getEligibleActions]);
  return (
    <Box
      className={`${SessionStyle.session__actions} flex text-sm px-2 py-2 gap-2`}
    >
      {actions.filter((action) => action.hidden === false).map((_action, index) => (
        <div className='flex cursor-pointer' onClick={() => initiateActionRequest(_action)} key={_action.id}>
          <Tooltip title={_action.tooltip}>
            <Typography className="dark:text-gray-500 text-gray-700" variant="body2">
              {_action.icon} {_action.title}
            </Typography>
          </Tooltip>

        </div>
      ))}
    </Box>
  );
}

export default Actions;
