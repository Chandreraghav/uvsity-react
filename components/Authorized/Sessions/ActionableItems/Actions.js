import { Box, Skeleton, Stack, Tooltip, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { APP, SESSION_ACTIONS } from "../../../../constants/userdata";
import SessionStyle from "../../../../styles/Session.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/router";
import { AUTHORIZED_ROUTES } from "../../../../constants/routes";
import { v4 as uuidv4 } from "uuid";
import { navigateToPath } from "../../Shared/Navigator";
function Actions(props) {
  const [actions, setActions] = useState(SESSION_ACTIONS)
  const router = useRouter();
  const isSessionRegistrationPossible = () => {
    if (props.data.owner) {
      //you the owner of the session
      return {
        status: APP.SESSION.ACTIONS.STATUS.OWNER,
        action: APP.SESSION.ACTIONS.ALIAS.REGISTRATION,
        flag: false,
      };
    }
    if (props.data.userRegistered) {
      //you have registered already
      return {
        status: APP.SESSION.ACTIONS.STATUS.ALREADY_REGISTERED,
        action: APP.SESSION.ACTIONS.ALIAS.REGISTRATION,
        icon: <CheckCircleIcon />,
        flag: false,
      };
    }
    if (!props.data.userRegistered && props.data.courseStatus == APP.SESSION.ACTIONS.STATUS.SESSION_EXPIRED_V2) {
      //session has expired
      return {
        status: APP.SESSION.ACTIONS.STATUS.SESSION_EXPIRED,
        action: APP.SESSION.ACTIONS.ALIAS.REGISTRATION,
        flag: false,
      };
    }

    if (
      !props.data.userRegistered &&
      (props.data.courseStatus == APP.SESSION.ACTIONS.STATUS.APPROVED ||
        props.data.courseStatus == APP.SESSION.ACTIONS.STATUS.ACTIVE) &&
      !props.data.isRegistrationPossible
    ) {
      //  Registration Full. The owner of this session is not accepting any new registration.
      if (!props.data.owner) {
        return {
          status: APP.SESSION.ACTIONS.STATUS.REGISTRATION_FULL,
          flag: false,
          action: APP.SESSION.ACTIONS.ALIAS.REGISTRATION,
        };
      }
    }

    if (
      !props.data.userRegistered &&
      (props.data.courseStatus == APP.SESSION.ACTIONS.STATUS.APPROVED ||
        props.data.courseStatus == APP.SESSION.ACTIONS.STATUS.ACTIVE) &&
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
          status: APP.SESSION.ACTIONS.STATUS.PAID,
          questionaire: false,
          flag: true,
          action: APP.SESSION.ACTIONS.ALIAS.REGISTRATION,
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
          status: APP.SESSION.ACTIONS.STATUS.PAID,
          questionaire: true,
          flag: true,
          action: APP.SESSION.ACTIONS.ALIAS.REGISTRATION,
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
          status: APP.SESSION.ACTIONS.STATUS.FREE,
          questionaire: true,
          flag: true,
          action: APP.SESSION.ACTIONS.ALIAS.REGISTRATION,
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
          status: APP.SESSION.ACTIONS.STATUS.FREE,
          questionaire: false,
          flag: true,
          action: APP.SESSION.ACTIONS.ALIAS.REGISTRATION,
        };
      }
    }

    return {
      status: null,
      flag: false,
      action: APP.SESSION.ACTIONS.ALIAS.REGISTRATION,
    };
  }
  const isSessionSponsorshipPossible = () => {
    if (
      !props.data.userRegistered &&
      (props.data.courseStatus == APP.SESSION.ACTIONS.STATUS.APPROVED ||
        props.data.courseStatus == APP.SESSION.ACTIONS.STATUS.ACTIVE) &&
      props.data.isRegistrationPossible
    ) {
      if (props.data.sponsorshipRequired) {
        return {
          flag: true,
          action: APP.SESSION.ACTIONS.ALIAS.SPONSORSHIP,
        };
      }
    }

    if (
      !props.data.userRegistered &&
      (props.data.courseStatus == APP.SESSION.ACTIONS.STATUS.APPROVED ||
        props.data.courseStatus == APP.SESSION.ACTIONS.STATUS.ACTIVE)
    ) {
      if (props.data.sponsorshipRequired) {
        return {
          flag: true,
          action: APP.SESSION.ACTIONS.ALIAS.SPONSORSHIP,
        };
      }
      if (
        props.data.userRegistered &&
        (props.data.courseStatus == APP.SESSION.ACTIONS.STATUS.APPROVED ||
          props.data.courseStatus == APP.SESSION.ACTIONS.STATUS.ACTIVE)
      ) {
        if (props.data.sponsorshipRequired) {
          return {
            flag: true,
            action: APP.SESSION.ACTIONS.ALIAS.SPONSORSHIP,
          };
        }
      }
      return {
        flag: false,
        action: APP.SESSION.ACTIONS.ALIAS.SPONSORSHIP,
      };
    }
    return {
      flag: false,
      action: APP.SESSION.ACTIONS.ALIAS.SPONSORSHIP,
    };
  }
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
              registrationObject.status === APP.SESSION.ACTIONS.STATUS.OWNER ||
              registrationObject.status === APP.SESSION.ACTIONS.STATUS.SESSION_EXPIRED ||
              registrationObject.status === APP.SESSION.ACTIONS.STATUS.REGISTRATION_FULL
            )
              return null;
            if (registrationObject.status === APP.SESSION.ACTIONS.STATUS.ALREADY_REGISTERED)
              return APP.SESSION.ACTIONS.STATUS.REGISTERED;
          }
          return action.title;
        case 2:
          const sponsorshipObject = isSessionSponsorshipPossible();
          if (!sponsorshipObject?.flag) return null;
          return action.title;
      }
    }
    return action.title;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initiateActionRequest = (action) => {
    if(action.id===3){
      console.log(props.data)
      navigateToPath(router,AUTHORIZED_ROUTES.AUTHORIZED.SESSION.PROFILE_INDEX + props.data?.courseId, {  token: uuidv4() })
   return;
    }
       console.log(getStatus(action, "action-request-status"));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isEligibleAction = (action) => {
    if (!action) return false
    switch (action.id) {
      case 1:
        const sessionRegistrationPossible = isSessionRegistrationPossible();
        if (sessionRegistrationPossible.status === APP.SESSION.ACTIONS.STATUS.ALREADY_REGISTERED) {
          const tempActions = actions.slice();
          tempActions.at(0).disabled = true;
          tempActions.at(0).title = APP.SESSION.ACTIONS.STATUS.REGISTERED
          tempActions.at(0).tooltip = "You've already registered for this session"
          setActions(tempActions);
          return true;
        }
        return sessionRegistrationPossible.flag;
      case 2:
        return isSessionSponsorshipPossible().flag;

      default:
        return true;
    }
  }

  const ActionStack = useMemo(
    () => {
      if (props.data) {
        return (
          <React.Fragment>
            {actions.filter((action) => action.hidden === false).map((_action, index) => {
              if (isEligibleAction(_action)) {
                return (<Stack role="button" className={` flex ${_action.disabled ? 'disabled' : 'cursor-pointer'}`} key={_action.id} onClick={() => initiateActionRequest(_action)}>
                  <Tooltip title={_action.tooltip}>
                    <Typography className="hover:bg-blue-800 hover:dark:text-gray-300 hover:text-gray-100  dark:text-gray-500  hover:font-bold text-gray-700 w-max p-2" variant="caption">
                      {_action.icon} {_action.title}
                    </Typography>
                  </Tooltip>
                </Stack>)
              }
            }
            )}
          </React.Fragment>
        );
      }
      else {
        <React.Fragment>
          {[1, 2, 3].map((_, index) => {
            return (<Skeleton key={index}
              animation={animation ? animation : "wave"}
              variant="text"
              height={30}
              className={'dark:bg-gray-600 '}
            />)

          }
          )}
        </React.Fragment>
      }
    },
    [actions, initiateActionRequest, isEligibleAction, props.data]
  );

  return (
    <Box
      className={`${SessionStyle.session__actions} flex px-1 justify-start align-middle items-start py-2 gap-2`}
    >
      {ActionStack}
    </Box>
  );
}

export default Actions;
