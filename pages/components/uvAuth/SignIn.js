import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SignInStyle from "../../../styles/SignIn.module.css"
function SignIn({ dialogCloseRequest, isOpen }) {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isBackDropClicked, setBackDropClicked] = React.useState(true);
  const handleIsolatedComponentInvocation = () => {
    if (dialogCloseRequest && !isBackDropClicked) dialogCloseRequest();
  };
  const handleBackdropClick = () => {
    if (!isBackDropClicked) setBackDropClicked(true);
  };
  const handleDirectClose = () => {
    if (dialogCloseRequest) dialogCloseRequest();
    setBackDropClicked(true)
  }
  return (
    <div className={SignInStyle.signin__root} >
      <Dialog
        
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleIsolatedComponentInvocation}
        modal={true}
        disableEscapeKeyDown
        onBackdropClick={handleBackdropClick}
        aria-labelledby="responsive-dialog-title"
      
      >
        <DialogTitle className={SignInStyle.signin__base__color} id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent className={SignInStyle.signin__base__color}>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions className={SignInStyle.signin__base__color}>
          <Button autoFocus onClick={handleDirectClose}>
            Disagree
          </Button>
          <Button onClick={handleDirectClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SignIn;
