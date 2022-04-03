import { useEffect } from "react";
import Router from "next/router";
import { useBeforeUnload } from "react-use";
import { USER_PAGE_LEAVE_CONFIRM_MESSAGE } from "../constants/constants";

export const useLeavePageConfirm = (
  isConfirm = true,
  message = USER_PAGE_LEAVE_CONFIRM_MESSAGE
) => {
  useBeforeUnload(isConfirm, message);

  useEffect(() => {
    const handler = () => {
      if (isConfirm && !window.confirm(message)) {
        throw "Route Canceled";
      }
    };

    Router.events.on("routeChangeStart", handler);

    return () => {
      Router.events.off("routeChangeStart", handler);
    };
  }, [isConfirm, message]);
};
