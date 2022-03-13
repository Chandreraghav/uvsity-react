import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ACCOUNT_SETTINGS } from "../../../../constants/userdata";
import { WORKFLOW_CODES } from "../../../../constants/workflow-codes";
import { useRouter } from "next/router";
import { useDataLayerContextValue } from "../../../../context/DataLayer";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import ConfirmDialog from "../../../shared/modals/ConfirmDialog";
import { SignOffUser } from "../../../Auth/SignOut";
toast.configure();
function AccountMenu({ onClose, isOpen, anchor }) {
  // Get QueryClient from the context
  const queryClient = useQueryClient();
  const [{}, unauthorize] = useDataLayerContextValue();
  const [logoutRequested, setLogoutRequested] = React.useState(false);
  const router = useRouter();
  const handleClose = () => {
    onClose(null, true);
  };
  const handleConfirmDialogRequest = (requestInd) => {
    if (requestInd.confirm) {
      logoff();
    } else {
      setLogoutRequested(false);
    }
  };
  const logoff = () => {
    SignOffUser(queryClient, router, unauthorize);
  };

  const handleMenuAction = (actionCode) => {
    if (!actionCode) {
      return;
    }
    switch (actionCode) {
      case WORKFLOW_CODES.USER.ACCOUNT_SETTINGS.EXIT:
        setLogoutRequested(true);

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
      <ConfirmDialog
        theme="dark"
        isOpen={logoutRequested}
        confirmMessage="Do you want to log out?"
        dialogCloseRequest={handleConfirmDialogRequest}
        title="Confirmation"
      />
    </div>
  );
}

export default AccountMenu;
