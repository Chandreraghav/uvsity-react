import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ACCOUNT_SETTINGS } from "../../../../constants/userdata";
import { WORKFLOW_CODES } from "../../../../constants/workflow-codes";
import { AuthService } from "../../../../pages/api/users/auth/AuthService";
import { useRouter } from "next/router";
import { useDataLayerContextValue } from "../../../../context/DataLayer";
import { actionTypes } from "../../../../context/reducer";
import { DEFAULT_ROUTE } from "../../../../constants/routes";
import SignOutService from "../../../../pages/api/users/auth/SignOutService";
import { handleResponse } from "../../../../toastr-response-handler/handler";
import { getWorkflowError } from "../../../../error-handler/handler";
import { LOGOUT } from "../../../../constants/error-messages";
import { RESPONSE_TYPES } from "../../../../constants/constants";
import { toast } from "react-toastify";
toast.configure();
function AccountMenu({ onClose, isOpen, anchor }) {
  const [{}, unauthorize] = useDataLayerContextValue();
  const router = useRouter();
  const handleClose = () => {
    onClose(null, true);
  };
  const eraseContext = () => {
    unauthorize({
      type: actionTypes.SET_USER,
      user: null,
    });
    unauthorize({
      type: actionTypes.USER.PROFILE_VISITS,
      PROFILE_VISITS: null,
    });
    unauthorize({
      type: actionTypes.USER.PROFILE_PERCENTAGE_COMPLETION,
      PROFILE_PERCENTAGE_COMPLETION: null,
    });

    unauthorize({
      type: actionTypes.USER.SUMMARY,
      SUMMARY: null,
    });
    unauthorize({
      type: actionTypes.USER.TOP_COURSES,
      TOP_COURSES: null,
    });
    unauthorize({
      type: actionTypes.USER.SUGGESTED_FRIENDS,
      SUGGESTED_FRIENDS: null,
    });

    unauthorize({
      type: actionTypes.USER.NETWORK_UPDATES,
      NETWORK_UPDATES: null,
    });
    unauthorize({
      type: actionTypes.USER.HOT_TOPICS,
      HOT_TOPICS: null,
    });

    unauthorize({
      type: actionTypes.USER.LOGGED_IN_INFO,
      LOGGED_IN_INFO: null,
    });
  };
  const handleMenuAction = (actionCode) => {
    if (!actionCode) {
      return;
    }
    switch (actionCode) {
      case WORKFLOW_CODES.USER.ACCOUNT_SETTINGS.EXIT:
        handleResponse(
          LOGOUT.INFO.IN_PROGRESS,
          RESPONSE_TYPES.INFO,
          toast.POSITION.TOP_CENTER
        );
        // voluntarily logout
        SignOutService.signout()
          .then(() => {
            AuthService.logout();
            eraseContext();
            router.push(DEFAULT_ROUTE.DASHBOARD);
          })
          .catch((error) => {
            handleResponse(
              getWorkflowError(LOGOUT.ERRORS.LOGOUT_FAILED),
              RESPONSE_TYPES.ERROR,
              toast.POSITION.TOP_CENTER
            );
          });

        return;
      case WORKFLOW_CODES.USER.ACCOUNT_SETTINGS.UPGRADE:
      case WORKFLOW_CODES.USER.ACCOUNT_SETTINGS.ACCOUNT:
      case WORKFLOW_CODES.USER.ACCOUNT_SETTINGS.EARNING:
        return;
      default:
        return;
    }
  };
  return (
    <div>
      <Menu
        anchorEl={anchor}
        open={isOpen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            color: "dargrey",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              fontSize: "14",
              color: "dargrey",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {ACCOUNT_SETTINGS.map((data) => (
          <MenuItem
            onClick={(e) => handleMenuAction(data.code)}
            sx={{ fontSize: "12px", color: "gray" }}
            key={data.id}
          >
            <ListItemIcon sx={{ fontSize: "12px", color: "gray" }}>
              {data.icon}
            </ListItemIcon>
            {data.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default AccountMenu;
