import { TOAST_MESSAGE_DEFAULT_DURATION_SECONDS } from "../constants/constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
export const handleResponse = (message, type, position, durationOfToast) => {
  if (!message || !type) return null;
  const duration = durationOfToast || TOAST_MESSAGE_DEFAULT_DURATION_SECONDS;
  const pos = position || toast.POSITION.BOTTOM_CENTER;
  const options = {
    position: pos,
    autoClose: duration,
    showAnimation: "animated bounceIn",
    hideAnimation: "animated bounceOut",
    className: "app__toast",
  };
  switch (type) {
    case "error":
      toast.error(message, options);
      break;
    case "warn":
      toast.warn(message, options);
      break;
    case "success":
      toast.success(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    default:
      toast.dark(message, options);
      break;
  }
};
