import { Box, Button, Skeleton, Stack, Tooltip, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { APP, SESSION, SESSION_ACTIONS } from "../../../../constants/userdata";
import SessionStyle from "../../../../styles/Session.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/router";
import { AUTHORIZED_ROUTES } from "../../../../constants/routes";
import { v4 as uuidv4 } from "uuid";
import { navigateToPath } from "../../Shared/Navigator";
import { useDataLayerContextValue } from "../../../../context";
import { useCallback } from "react";
import SessionAlreadyRegistered from "../../../SessionCards/SessionAlreadyRegistered";
function Actions(props) {
  const [ctxUserdata, dispatch] = useDataLayerContextValue();
  console.log(props)
  const router = useRouter();
  const [alreadyRegistered, setRegistered] = useState(false)
  const isSessionOwner = useCallback((loggedInUser) => {
    return loggedInUser?.userDetailsId === props.data?.creator?.userDetailsId
  }, [props.data?.creator?.userDetailsId])

  const isSessionRegistrationPossible = useCallback((loggedInUser = null) => {
    if (isSessionOwner(loggedInUser) || props.data.owner) {
      //logged in user is the owner of the session, hence self registration is not possible.
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
  }, [isSessionOwner, props.data.cost, props.data.courseStatus, props.data.isRegistrationPossible, props.data.owner, props.data.registrationQuestionnaireId, props.data.userRegistered])

  const isSessionSponsorshipPossible = useCallback((loggedInUser = null) => {
    if (props.context && props.context === 'view-session-detail') {
      // if actions component is invoked through the view-session-detail context then do not show the sponsorship button, as sponsorship button is available on the bottom of the view session page
      return {
        flag: false,
        action: APP.SESSION.ACTIONS.ALIAS.SPONSORSHIP,
      };

    }
    if (isSessionOwner(loggedInUser) || props.data.owner && props.data?.sponsorshipRequired) {
      //logged in user is the owner of the session and they can sponsor anytime, if sponsorship option is enabled.
      return {
        flag: true,
        action: APP.SESSION.ACTIONS.ALIAS.SPONSORSHIP,
      };
    }

    // only registered users of a session can sponsor a session
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
  }, [isSessionOwner, props.context, props.data.courseStatus, props.data.owner, props.data.sponsorshipRequired, props.data.userRegistered])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initiateActionRequest = (action) => {
    if (action.id) {
      navigateToPath(router, AUTHORIZED_ROUTES.AUTHORIZED.SESSION.PROFILE_INDEX + props.data?.courseId, { token: uuidv4() })
      return;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isEligibleAction = (action, loggedInUser) => {
    if (!action) return false
    if (action.hidden === true) return false;
    switch (action.id) {
      case 1:
        const sessionRegistrationPossible = isSessionRegistrationPossible(loggedInUser);
        if (sessionRegistrationPossible.status === APP.SESSION.ACTIONS.STATUS.ALREADY_REGISTERED) {
          if (!alreadyRegistered)
            setRegistered(true)
          return false;
        }
        return sessionRegistrationPossible.flag;
      case 2:
        return isSessionSponsorshipPossible(loggedInUser).flag;

      default:
        return true;
    }
  }

  const _ActionTypography = useCallback((_action) => {
    if (!props.context)
      return (
        <Typography className='hover:bg-blue-800 hover:dark:text-gray-300 hover:text-gray-100  dark:text-gray-500  hover:font-bold text-gray-700 w-max p-2' variant="caption">
          {_action.icon} {_action.title}
        </Typography>
      )
    if (props.context && props.context === 'view-session-detail') {
      return (
        <Button variant="contained" startIcon={_action.icon}>
          {_action.title}
        </Button>
      )
    }
  }, [props.context])


  const filteredActions = useMemo(() => {
    return SESSION_ACTIONS.filter((_action) => isEligibleAction(_action, ctxUserdata?.logged_in_info));
  }, [ctxUserdata?.logged_in_info, isEligibleAction]);

  //console.log(filteredActions)

  const ActionStack = useMemo(
    () => {
      if (props.data) {
        return (
          <React.Fragment>
            {filteredActions.map((_action, index) =>

            (
              <Stack role="button" className={` flex ${_action.disabled ? 'disabled' : 'cursor-pointer'}`} key={_action.id} onClick={() => initiateActionRequest(_action)}>
                <Tooltip title={_action.tooltip}>
                  {_ActionTypography(_action)}
                </Tooltip>
              </Stack>
            )


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
    [_ActionTypography, filteredActions, initiateActionRequest, props.data]
  );

  return (
    <Box
      className={`${SessionStyle.session__actions} flex ${!props.context ? 'px-1' : ''} py-2 gap-2`}
    >
      {ActionStack}

      {props.context && props.context === 'view-session-detail' && alreadyRegistered && (<div className='p-2 flex'><CheckCircleIcon /><SessionAlreadyRegistered label={props?.data.active === true ? SESSION.ALREADY_REGISTERED.CURRENTLY : SESSION.ALREADY_REGISTERED.IN_THE_PAST} /></div>)}
    </Box>
  );
}

export default Actions;
